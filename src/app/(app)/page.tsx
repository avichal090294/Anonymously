'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Shield, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-16 bg-zinc-900 text-white">
        <section className="text-center mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-zinc-800 rounded-full px-4 py-1.5 mb-6 text-sm text-zinc-300">
            <Shield className="w-4 h-4 text-emerald-400" />
            100% Anonymous & Secure
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Dive into the World of Anonymous Conversations
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Anonnymously — Where your identity remains a secret.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-white text-zinc-900 hover:bg-zinc-200 font-semibold">
                Get Started
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                Sign In
              </Button>
            </Link>
          </div>
        </section>

        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{ loop: true }}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-2">
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-zinc-100">
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-start gap-3">
                    <Mail className="w-5 h-5 shrink-0 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-zinc-300">{message.content}</p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 mb-3">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-zinc-100 mb-1">Fully Anonymous</h3>
            <p className="text-sm text-zinc-400">Your identity is never revealed to the recipient.</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 mb-3">
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold text-zinc-100 mb-1">Real Feedback</h3>
            <p className="text-sm text-zinc-400">Get honest opinions without social pressure.</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 mb-3">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-zinc-100 mb-1">Easy Sharing</h3>
            <p className="text-sm text-zinc-400">Share your unique link and start receiving messages.</p>
          </div>
        </section>
      </main>

      <footer className="text-center p-4 md:p-6 bg-zinc-950 text-zinc-500 text-sm">
        © {new Date().getFullYear()} Anonymously. All rights reserved.
      </footer>
    </>
  );
}