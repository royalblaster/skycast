export default async function Page({
  params,
}: {
  params: Promise<{ cityName: string }>;
}) {
  const { cityName } = await params;
  return <div>My Post: {cityName}</div>;
}
