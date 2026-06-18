/**
 * Central configuration barrel. Import business facts from here, e.g.
 *   import { company, contact, services } from '@/config';
 */
export * from './confirmable';
export { company } from './company';
export { contact } from './contact';
export { legal } from './legal';
export { support } from './support';
export { integrations } from './integrations';
export {
  services,
  servicesInOrder,
  getServiceBySlug,
  getServiceById,
  type Service,
  type ServiceFaq,
  type ServiceFeature,
} from './services';
export {
  engagementModels,
  getEngagementModel,
  PRICING_MODE,
  type PricingMode,
  type Price,
  type EngagementModel,
} from './packages';
export {
  primaryNav,
  headerCta,
  footerCompanyNav,
  footerLegalNav,
  type NavItem,
} from './navigation';
export { seo, staticKeywordMap, type KeywordEntry } from './seo';
