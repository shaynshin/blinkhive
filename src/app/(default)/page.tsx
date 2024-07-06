import PageHeader from "@/components/prelaunch/page-header";
import SubscribeForm from "@/components/prelaunch/subscribe-form";

export default function Home() {
  return (
    <section>
      <div className="pt-32 pb-12 md:pt-44 md:pb-20 min-h-[calc(100vh-4rem)] flex justify-center items-center">
        <div className="px-4 sm:px-6 -mt-20 w-full">
          <PageHeader
            className="mb-12"
            title="shilling reimagined."
            description={`Tired of shilling and getting nothing in return? Us too. Now it is all going to change.`}
          >
            Waitlist <span className="text-gray-300 mx-1">·</span> Coming Soon
          </PageHeader>

          <SubscribeForm />
        </div>
      </div>
    </section>
  );
}
