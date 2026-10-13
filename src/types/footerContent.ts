export type SocialKind = "telegram" | "vk" | "instagram" | "dzen";
export type SocialLink = { kind: SocialKind; url: string };
export type FooterDocumentLink = { label: string; fileUrl: string };
export type FooterFields = {
  email: string;
  socials: SocialLink[];
  documents: FooterDocumentLink[];
  copyright: string;
  freeText: string;
};
