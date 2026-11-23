import {
  ChefHat,
  ClipboardCheck,
  ClipboardList,
  Croissant,
  Factory,
  FileCheck2,
  FlaskConical,
  GlassWater,
  GraduationCap,
  Milk,
  PackageCheck,
  Pill,
  RefreshCw,
  Scale,
  SearchCheck,
  Settings,
  ShieldCheck,
  Ship,
  ShoppingCart,
  Sprout,
  Store,
  Tag,
  TestTubes,
  UtensilsCrossed,
  Warehouse,
  type LucideProps,
} from "lucide-react";

const icons = {
  ChefHat,
  ClipboardCheck,
  ClipboardList,
  Croissant,
  Factory,
  FileCheck2,
  FlaskConical,
  GlassWater,
  GraduationCap,
  Milk,
  PackageCheck,
  Pill,
  RefreshCw,
  Scale,
  SearchCheck,
  Settings,
  ShieldCheck,
  Ship,
  ShoppingCart,
  Sprout,
  Store,
  Tag,
  TestTubes,
  UtensilsCrossed,
  Warehouse,
};

export type AnyIconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name as AnyIconName] ?? ShieldCheck;
  return <Cmp aria-hidden="true" {...props} />;
}
