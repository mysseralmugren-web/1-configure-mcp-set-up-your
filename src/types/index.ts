export type Locale = "ar" | "en";

export type FurnitureCategory = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  itemCount?: number;
};

export type FurnitureProduct = {
  id: string;
  slug: string;
  sku: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  categoryId: string;
  categoryNameAr?: string;
  categoryNameEn?: string;
  images: string[];
  model3dUrl?: string; // Optional GLB/GLTF model URL
  modelType?: "glb" | "procedural" | "none";
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
    unit: "mm" | "cm";
  };
  materials?: string[];
  materialsEn?: string[];
  finishes?: string[];
  finishesEn?: string[];
  featuresAr?: string[];
  featuresEn?: string[];
  featured: boolean;
  published: boolean;
  leadTimeWeeks?: number;
  customizable?: boolean;
};

export type FactoryService = {
  id: string;
  slug: string;
  order: number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName: string;
  coverImage: string;
  galleryImages: string[];
  technicalSpecsAr: string[];
  technicalSpecsEn: string[];
  capabilitiesAr: string[];
  capabilitiesEn: string[];
  relatedCategoryIds?: string[];
};

export type ProjectPortfolio = {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  category: "commercial" | "residential" | "hospitality" | "executive";
  categoryLabelAr: string;
  categoryLabelEn: string;
  clientAr: string;
  clientEn: string;
  locationAr: string;
  locationEn: string;
  completionDate: string;
  areaM2?: number;
  descriptionAr: string;
  descriptionEn: string;
  scopeAr: string[];
  scopeEn: string[];
  coverImage: string;
  galleryImages: string[];
  manufacturingImages?: string[];
  installationImages?: string[];
  featured: boolean;
  relatedServiceSlugs?: string[];
};

export type QuoteRequest = {
  id?: string;
  referenceNo?: string;
  customerName: string;
  companyName?: string;
  phone: string;
  email?: string;
  city: string;
  serviceType: string;
  projectDescription: string;
  quantity?: number;
  preferredDate?: string;
  attachments?: string[];
  status?: "new" | "in_review" | "quoted" | "archived";
  createdAt?: string;
};

export type ManufacturingStep = {
  step: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  machineryAr: string;
  machineryEn: string;
};
