import type { BusinessProfile, TemplateDefinition } from "@palawan-site-engine/schemas";

export type ImageRecord = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export function resolveImageSlots(
  profile: BusinessProfile,
  template: TemplateDefinition
): Record<string, ImageRecord[]> {
  const out: Record<string, ImageRecord[]> = {};
  for (const [slot, spec] of Object.entries(template.imageSlots)) {
    const list = (profile.images.value[slot] ?? []) as ImageRecord[];
    if (list.length < spec.min) {
      throw new Error(`Too few images in slot "${slot}": ${list.length} < min ${spec.min} (${spec.label})`);
    }
    if (list.length > spec.max) {
      throw new Error(`Too many images in slot "${slot}": ${list.length} > max ${spec.max} (${spec.label})`);
    }
    out[slot] = list;
  }
  return out;
}

export function validateSlotCounts(profile: BusinessProfile, template: TemplateDefinition): string[] {
  const errors: string[] = [];
  for (const [slot, spec] of Object.entries(template.imageSlots)) {
    const len = profile.images.value[slot]?.length ?? 0;
    if (len < spec.min) errors.push(`slot ${slot}: ${len} < min ${spec.min}`);
    if (len > spec.max) errors.push(`slot ${slot}: ${len} > max ${spec.max}`);
  }
  return errors;
}
