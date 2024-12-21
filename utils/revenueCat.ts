import { useEffect, useState } from 'react';
import Purchases, { PurchasesPackage, CustomerInfo } from 'react-native-purchases';

export const RevenueCat = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [availablePackages, setAvailablePackages] = useState<PurchasesPackage[]>([]);
  const [availableCreditPackages, setAvailableCreditPackages] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    configureRevenueCat(process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY!);
    checkSubscriptionStatus().then(setIsSubscribed);
    getAvailablePackages().then(setAvailablePackages);
    getAvailableCreditPackages().then(setAvailableCreditPackages);
  }, []);

  return {
    isSubscribed,
    availablePackages,
    availableCreditPackages,
  };
};

// RevenueCat API anahtarını yapılandırma
export const configureRevenueCat = (apiKey: string) => {
  Purchases.configure({ apiKey });
};

// Abonelik durumunu kontrol etme
export const checkSubscriptionStatus = async (): Promise<boolean> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.activeSubscriptions.length > 0;
  } catch (error) {
    console.error('Abonelik kontrolünde hata:', error);
    return false;
  }
};

// Mevcut paketleri listeleme
export const getAvailablePackages = async (): Promise<PurchasesPackage[]> => {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages ?? [];
  } catch (error) {
    console.error('Paketleri listelerken hata:', error);
    return [];
  }
};

// Paket satın alma
export const purchasePackage = async (package_: PurchasesPackage): Promise<CustomerInfo | null> => {
  try {
    const { customerInfo } = await Purchases.purchasePackage(package_);
    return customerInfo;
  } catch (error) {
    console.error('Satın alma işleminde hata:', error);
    return null;
  }
};

// Satın almaları geri yükleme
export const restorePurchases = async (): Promise<CustomerInfo | null> => {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (error) {
    console.error('Satın almaları geri yüklerken hata:', error);
    return null;
  }
};

// Kredileri kontrol etme
export const checkCredits = async (): Promise<number> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    // Kredileri özel bir entitlement'tan okuma
    return customerInfo.entitlements.active['credits']?.value ?? 0;
  } catch (error) {
    console.error('Kredi kontrolünde hata:', error);
    return 0;
  }
};

// Kredi paketi satın alma
export const purchaseCredits = async (creditPackage: PurchasesPackage): Promise<boolean> => {
  try {
    await Purchases.purchasePackage(creditPackage);
    return true;
  } catch (error) {
    console.error('Kredi satın alırken hata:', error);
    return false;
  }
};

// Mevcut kredi paketlerini listeleme
export const getAvailableCreditPackages = async (): Promise<PurchasesPackage[]> => {
  try {
    const offerings = await Purchases.getOfferings();
    // 'credits' adlı özel bir offering kullanıyoruz
    return offerings.all['credits']?.availablePackages ?? [];
  } catch (error) {
    console.error('Kredi paketlerini listelerken hata:', error);
    return [];
  }
};


export default RevenueCat;
