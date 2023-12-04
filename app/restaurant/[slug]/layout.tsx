import MenuHeader from "../components/MenuHeader";

export default function RestaurantLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: {slug:string}
  }) {
  return (
    <main>
      <MenuHeader title={params.slug}/>
      <div className="-mt-9 w-2/3 flex justify-between items-start m-auto">
        {children}
      </div>
    </main>
  );
}
