import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/team",
    title: "Team Members | AVCONEXPO",
    description:
      "Meet AVCONEXPO's team members and experts across engineering, architecture, project management, and business consulting.",
    imageUrl: "/bg/videoBg4_3.jpg",
  });
}

const members = [
  {
    name: "Dilip Kumar Singh",
    experience: "29+ years of experience",
    image: "/team/Dilip-Singh.png",
    bio: "With over 29 years of experience, Mr. Dilip Kumar Singh is a proven leader in the industry. He has successfully set up and led numerous greenfield projects, demonstrating his ability to navigate complex challenges and achieve business objectives.",
  },
  {
    name: "Lav Sharma",
    experience: "33+ years of experience",
    image: "/team/Luv-Sharma.png",
    bio: "Mr. Luv Sharma is a highly skilled HR consultant with a proven track record in driving organizational growth. He brings 33+ years of experience in designing and implementing effective performance management systems and talent retention strategies.",
  },
  {
    name: "Ar. Sachin Kumar Dubey",
    experience: "25+ years of experience",
    image: "/team/Sachin-dubey.png",
    bio: "With over 25 years of experience, Ar. Sachin Dubey is a leading expert in architectural and interior design. He has successfully led numerous projects, from the initial concept to the final construction phase.",
  },
  {
    name: "Shailendra Kaushik",
    experience: "35+ years of experience",
    image: "/team/Shailendra-Kaushik.png",
    bio: "Mr. Shailendra Kaushik is a highly qualified Chartered Accountant with extensive experience in management and finance. He specializes in providing strategic business consulting services and optimizing financial performance.",
  },
  {
    name: "Eng. Robert Oyando Omenya",
    experience: "35+ years of experience",
    image: "/team/Robert-Oyenado.png",
    bio: "Robert Oyando Omenya is a seasoned engineer with a proven track record in mechanical and electrical engineering. His 35+ years of experience span plant design, installation, maintenance, and optimization.",
  },
  {
    name: "Bansh Gopal Singh",
    experience: "35+ years of experience",
    image: "/team/Bansh-Gopal.png",
    bio: "Mr. Bansh Gopal Singh is a highly skilled landscape architect with a deep understanding of horticulture and eco-tourism. He has successfully led large-scale projects from concept to completion.",
  },
  {
    name: "Vishal Gohade",
    experience: "21+ years of experience",
    image: "/team/Vishal-Guhade.png",
    bio: "Mr. Vishal Gohade is a highly skilled chemical engineer with deep experience in biofuels and bioethanol. His expertise includes project design, engineering, erection, commissioning, and international trade.",
  },
  {
    name: "Jean De Dieu Furaha",
    experience: "17+ years of experience",
    image: "/team/Jean-De-Dieu.png",
    bio: "Mr. Jean De Dieu Furaha is a skilled data analyst and entrepreneur with a strong background in business development. He leverages data-driven insights to drive business growth and effective promotion strategies.",
  },
  {
    name: "Sheeraz Kalra",
    experience: "25+ years of experience",
    image: "/team/shirazkalra-270x367.png",
    bio: "Mr. Shiraz Kalra is a seasoned hospitality professional with over 25 years of experience. He specializes in resort, club, and hotel setup and management, as well as golf course design and construction.",
  },
  {
    name: "Om Prakash",
    experience: "13+ years of experience",
    image: "/team/omprakash-270x367.png",
    bio: "With over 13 years of experience, Mr. Om Prakash is a trusted advisor for businesses across industries. He helps clients achieve financial goals through taxation, compliance, accounting, and auditing expertise.",
  },
  {
    name: "Pramod Kumar Singh",
    experience: "40+ years of experience",
    image: "/team/Promod-Kumar.png",
    bio: "Mr. Pramod Kumar Singh is a seasoned project manager with a proven track record in manufacturing. He has led large teams across soap, edible oil, detergents, cosmetics, plastics, and beverages.",
  },
  {
    name: "Ali Hussein",
    experience: "25+ years of experience",
    image: "/team/Ali-hasan.png",
    bio: "With a diploma in engineering and strong project management capabilities, Mr. Ali Hussein has delivered numerous Greenfield and Brownfield projects, handling complex challenges with confidence.",
  },
  {
    name: "Ms. Charmaine Fernandes Sharma",
    experience: "33+ years of experience",
    image: "/team/Ms-Charmaine.png",
    bio: "With 33+ years of experience, Ms. Charmaine Fernandes Sharma is a seasoned entrepreneur and recognized industry leader. She has been awarded for achievements in biotechnology and is listed as an Indian inventor.",
  },
  {
    name: "Mr. Ravi Nafde",
    experience: "45+ years of experience",
    image: "/team/Ravi-Nafade.png",
    bio: "Mr. Ravi Nafde is a seasoned engineer with over 45 years of experience. He is a pioneer in the development of Energy Recovery Technology (ERT) for waste conversion and holds degrees from IIT Bombay and VNIT Nagpur.",
  },
];

export default function TeamPage() {
  return (
    <>
      <TopBar />

      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image
            src="/bg/videoBg4_3.jpg"
            alt="AVCONEXPO team backdrop"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <Navbar />

          <div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Team Members</h1>
            <nav aria-label="Breadcrumb" className="mt-5 text-sm font-semibold text-white/85">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              / <span className="text-white">Team Members</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="relative overflow-hidden bg-[#f7f7f7] py-16 sm:py-20">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#ff8c00]/10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-5xl rounded-[32px] bg-gradient-to-r from-[#f0571f] to-[#faa419] px-6 py-8 text-center text-white shadow-xl">
            <p className="mb-2 inline-flex items-center justify-center gap-2 text-sm font-extrabold uppercase tracking-wide">
              <Image src="/icon/subTitleIcon.svg" alt="" width={18} height={12} aria-hidden />
              Team
            </p>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Team Members</h2>
            <p className="mx-auto mt-4 max-w-4xl text-sm leading-6 text-white/90 sm:text-base">
              We&apos;ve been in this business for many years and have built an operation predicated on
              constant refinement and relentless growth. We pool our collective brainpower, support each
              other when it&apos;s crunch time, and stay committed to upholding the promises we make to clients.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {members.map((member) => (
              <article
                key={member.name}
                className="group overflow-hidden rounded-[22px] border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#f0571f]/60 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />
                </div>
                <div className="border-t-4 border-[#f0571f] p-5">
                  <h3 className="text-lg font-extrabold text-[#1a1a1a]">{member.name}</h3>
                  <p className="mt-1 text-sm font-bold text-[#f15e22]">{member.experience}</p>
                  <p className="mt-3 text-justify text-sm leading-6 text-[#4b5563]">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
