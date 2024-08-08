import Navigation from "@/components/layouts/navigation";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
