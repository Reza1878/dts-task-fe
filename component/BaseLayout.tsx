import Head from "next/head";
import React, { HTMLAttributes } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BaseLayoutProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

function BaseLayout(props: BaseLayoutProps) {
  const { title, children } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </Head>

      <nav className="flex bg-primary">
        <div className="container mx-auto lg:px-24 px-6 py-4">
          <a href="#" className="text-white font-medium text-3xl">
            TASK
          </a>
        </div>
      </nav>

      <main>{children}</main>
      <ToastContainer />
    </div>
  );
}

export default BaseLayout;
