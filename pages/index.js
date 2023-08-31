import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import EmailForm from "./form";
export default function Home() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    // Handle response if neccessary
    const data = await response.json();
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          I am kindness but you can call me kay , i dont have much to share , i
          dont do much, i just code and Learn
        </p>
        (This is a sample website - you’ll be building a site like this on{" "}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
      </section>
      <div className={utilStyles.headingMd}>
        <section>
          <h1>Join our NewsLetter and stay updated with every blog post </h1>
          <EmailForm onSubmit={handleSubmit} />
        </section>
      </div>
      <div>
        <Link className={utilStyles.blogs} href="/blogs">
          Blogs
        </Link>
      </div>
    </Layout>
  );
}
