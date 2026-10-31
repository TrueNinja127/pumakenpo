import Image from "next/image";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-puma/20 blur-[140px]" />
      <div className="container-x relative text-center">
        <Image src="/images/brand/logo-light.png" alt="" width={120} height={100} className="mx-auto h-auto w-24 opacity-90" />
        <p className="text-outline-strong mt-6 font-display text-[11rem] leading-none md:text-[16rem]">404</p>
        <h1 className="font-display text-4xl uppercase tracking-wide md:text-6xl">
          This page <span className="text-puma">tapped out</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-mute">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/">Back Home</Button>
          <Button href="/schedule" variant="outline">
            Class Schedule
          </Button>
        </div>
      </div>
    </section>
  );
}
