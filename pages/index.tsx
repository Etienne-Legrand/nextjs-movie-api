import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="bg-gray-200 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 py-16">
        Movie API
      </h2>
      <div className="mx-auto px-6 max-w-6xl text-gray-500">
        <div className="relative z-10 grid gap-3 grid-cols-6">
          {/* MongoDB */}
          <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 flex flex-col justify-center items-center">
            <Image
              src="/mongodb.svg"
              alt="MongoDB Logo"
              width={280}
              height={140}
            />

            {isConnected ? (
              <h2 className="mt-6 text-center font-semibold text-gray-950 dark:text-white text-lg">
                Vous êtes connecté
              </h2>
            ) : (
              <h2 className="mt-6 text-center font-semibold text-gray-950 dark:text-white text-lg">
                Vous n'êtes PAS connecté
              </h2>
            )}
          </div>

          {/* API */}
          <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 flex flex-col justify-center items-center">
            <Link href="/api">
              <Image src="/API.png" alt="API" width={300} height={256} />
              <h2 className="mt-6 text-center font-semibold text-gray-950 dark:text-white text-lg">
                Accéder à l'API
              </h2>
            </Link>
          </div>

          {/* Swagger */}
          <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 flex flex-col justify-center items-center">
            <Link href="/swagger">
              <Image
                src="/swagger-logo.png"
                alt="Swagger logo"
                width={409}
                height={100}
              />
              <h2 className="mt-6 text-center font-semibold text-gray-950 dark:text-white text-lg">
                Accéder au Swagger
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
