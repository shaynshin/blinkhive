"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createMagic } from "@/lib/magic";

const LoadingAnimation = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-base-200">
    <span className="loading loading-bars loading-lg text-info"></span>
    <p className="mt-4 text-lg text-base-content">
      Just a second, we are getting the page ready for you!
    </p>
  </div>
);

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const magic = createMagic();
      const checkAuth = async () => {
        try {
          const isLoggedIn = await magic!.user.isLoggedIn();
          if (!isLoggedIn) {
            router.push("/login");
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          router.push("/login");
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
