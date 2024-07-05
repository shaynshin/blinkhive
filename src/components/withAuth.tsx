"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createMagic } from "@/lib/magic";
import { useLoggedInStore } from "@/stores/loggedInStore";

const LoadingAnimation = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
    <span className="loading loading-bars loading-lg text-info" />
  </div>
);

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const setLoggedIn = useLoggedInStore((state) => state.setLoggedIn);

    useEffect(() => {
      const magic = createMagic();
      const checkAuth = async () => {
        try {
          const [didToken, userMetadata] = await Promise.all([
            await magic?.user.getIdToken(),
            await magic?.user.getMetadata(),
          ]);

          if (!didToken || !userMetadata) {
            router.push("/dashboard/login");
          } else {
            setLoggedIn(true);
            const response = await fetch("/api/whitelist/merchant", {
              headers: {
                Authorization: `Bearer ${didToken}`,
              },
            });

            if (!response.ok)
              router.push(
                `/dashboard/waitlist?role=merchant&email=${userMetadata?.email}`
              );
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          router.push("/dashboard/login");
        }
      };

      checkAuth();
    }, []);

    if (isLoading) {
      return <LoadingAnimation />;
    }

    return <WrappedComponent {...props} />;
  };

  // Set display name for the HOC for better debugging messages
  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return AuthComponent;
};

export default withAuth;
