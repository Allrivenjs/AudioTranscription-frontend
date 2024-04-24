import {Container} from "@/app/ui/Container";
import {LinkIcon} from "@heroicons/react/16/solid";
import {BackwardIcon, ChevronLeftIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import Form from "@/app/ui/create/FormCreate";

export default function CreatePage() {
  return (
      <div className="pt-16 lg:pt-12">
          <Container>
             <div className="flex items-center gap-3">
                 <Link href="/dashboard" className="h-8 w-8 text-slate-500 hover:border rounded-full flex items-center text-center justify-center" >
                     <ChevronLeftIcon className="h-6 w-6 text-xl font-bold text-black" /> </Link>
                 <h1 className="text-2xl font-bold leading-7 text-slate-900">
                     Nueva Transcripción
                 </h1>
             </div>
          </Container>
          <div className="divide-y divide-slate-100 sm:mt-1 lg:mt-2 lg:border-t lg:border-slate-100">
              <Form/>
          </div>
      </div>
  )
}