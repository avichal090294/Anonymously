"use client";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Copy, Loader2, MessageSquare, RefreshCcw, Link as LinkIcon, Mail } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    setMessages(
      messages.filter((message) => message._id.toString() !== messageId),
    );
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast.success("Refreshed", {
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error("Error", {
          description:
            axiosError.response?.data.message || "Failed to fetch messages",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages],
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.success("Updated", {
        description: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ||
          "Failed to update message settings",
      });
    }
  };

  const profileUrl = useMemo(() => {
    if (typeof window === "undefined" || !session?.user) return "";
    const { username } = session.user as User;
    return `${window.location.origin}/u/${username}`;
  }, [session]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Copied!", {
      description: "Profile URL has been copied to clipboard.",
    });
  };

  if (!session || !session.user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center space-y-4">
          <MessageSquare className="w-12 h-12 mx-auto text-zinc-400" />
          <p className="text-zinc-500 text-lg">Please sign in to access your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            Manage your anonymous messages and sharing preferences.
          </p>
        </div>

        {/* Share Link Card */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="w-4 h-4 text-zinc-500" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Your Unique Link
            </h2>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
            Share this link to receive anonymous messages from anyone.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 font-mono truncate">
              {profileUrl}
            </div>
            <Button
              onClick={copyToClipboard}
              size="sm"
              className="shrink-0 gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </div>
        </div>

        {/* Settings Card */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${acceptMessages ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
              />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Accept Messages
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {acceptMessages
                    ? "You are currently receiving anonymous messages."
                    : "You are not receiving anonymous messages."}
                </p>
              </div>
            </div>
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
            />
          </div>
        </div>

        {/* Messages Section */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-zinc-500" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Messages
              </h2>
              <span className="ml-1 inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {messages.length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                fetchMessages(true);
              }}
              disabled={isLoading}
              className="gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
          <Separator />
          <div className="p-6">
            {messages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {messages.map((message) => (
                  <MessageCard
                    key={message._id.toString()}
                    message={message}
                    onMessageDelete={handleDeleteMessage}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4 mb-4">
                  <MessageSquare className="w-8 h-8 text-zinc-400" />
                </div>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium mb-1">
                  No messages yet
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
                  Share your unique link with others to start receiving anonymous
                  messages.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;