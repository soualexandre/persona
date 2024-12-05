"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Server,
  DockIcon,
  FileCode2,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-36 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                <Image
                  src="/images/1732977904540.jpeg"
                  alt="Alexandre Souza dos Santos"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="pt-20 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Alexandre Souza dos Santos
            </h1>
            <p className="text-gray-600 mt-2">Desenvolvedor Full Stack</p>

            <div className="mt-6 px-6">
              <div className="flex justify-center space-x-4 mb-6">
                <Link
                  href="mailto:alexandre.souza.office@gmail.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Mail size={24} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/eualexandre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Linkedin size={24} />
                </Link>
                <Link
                  href="https://github.com/soualexandre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Github size={24} />
                </Link>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-700">
                  Desenvolvedor apaixonado por tecnologia, criando soluções
                  inovadoras e elegantes para desafios complexos.
                </p>
              </div>
            </div>

            <div className="mt-6 py-4 border-t border-gray-200">
              <Link
                href="https://eualexandre.vercel.app/"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Ver Projetos
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-2xl rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Template Next.js, Tailwind, Nest.js, Docker, Makefile.
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Server className="text-blue-500" />
              <h3 className="font-semibold text-gray-700">Arquitetura</h3>
            </div>
            <p className="text-gray-600">
              Next.js 14 - Tailwind CSS - Suporte a Docker - Design Responsivo -
              Fácil customização
            </p>

            <div className="flex items-center space-x-3">
              <DockIcon className="text-blue-500" />
              <h3 className="font-semibold text-gray-700">Containerização</h3>
            </div>
            <p className="text-gray-600">
              Dockerização completa com Dockerfile otimizado para build e
              desenvolvimento, garantindo ambiente consistente e escalável.
            </p>

            <div className="flex items-center space-x-3">
              <FileCode2 className="text-blue-500" />
              <h3 className="font-semibold text-gray-700">Makefile</h3>
            </div>
            <p className="text-gray-600">
              Makefile personalizado para automatizar tarefas.
            </p>

            <div className="mt-6">
              <Link
                href="https://github.com/soualexandre/template_inicial_projeto_next_and_nest"
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Git do projeto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
