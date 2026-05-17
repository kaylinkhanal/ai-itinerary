"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import {
  Building2,
  CalendarDays,
  Compass,
  Loader2,
  MapPin,
  SendIcon,
  Sparkles,
  Sunrise,
  Sunset,
  Sun,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import MapPanel from "@/components/MapPanel";

interface Activity {
  time_slot: string;
  location: string;
  description: string;
  is_off_beaten_path: boolean;
}

interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

interface ItineraryData {
  destination: string;
  travel_dates_context: string;
  seasonal_considerations: string;
  local_events_2026: string[];
  accommodation: {
    name: string;
    description: string;
    coordinates: { lat: number; lng: number };
  };
  itinerary: DayPlan[];
}

const timeSlotIcon = (slot: string) => {
  const s = slot.toLowerCase();
  if (s.includes("morning") || s.includes("sunrise")) return <Sunrise className="w-4 h-4" />;
  if (s.includes("afternoon") || s.includes("lunch")) return <Sun className="w-4 h-4" />;
  if (s.includes("evening") || s.includes("night")) return <Sunset className="w-4 h-4" />;
  return <Compass className="w-4 h-4" />;
};

const ItineraryView = ({ data }: { data: ItineraryData }) =>{

   data = JSON.parse(data)
   console.log("data is" , data)
  return(
  <div className=" font-sans text-xl  space-y-8 p-4 text-gray-900 h-36 ">
    {/* Header */}
    <div className="border-b pb-6">
      <p className="mt-2 ">{data?.seasonal_considerations}</p>
    </div>

    {/* Local Events */}
    {data?.local_events_2026?.length > 0 && (
      <div>
        <div className="mb-3 flex items-center gap-2 border-b pb-1">
          <CalendarDays className="w-4 h-4" />
          <span className="font-bold   uppercase">Local Events: {data?.travel_dates_context}</span>
        </div>
        <ul className="space-y-2">
          {data?.local_events_2026.map((event, i) => (
            <li key={i} className="  flex gap-2">
              <span className="shrink-0 text-gray-400">•</span>
              <span>{event}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Accommodation */}
    <div>
      <div className="mb-2 flex items-center gap-2 border-b pb-1">
        <Building2 className="w-4 h-4" />
        <span className="font-bold   uppercase">Recommended Stay</span>
      </div>
      <p className="font-bold text-base">{data.accommodation?.name}</p>
      <p className="mt-1 ">{data.accommodation?.description}</p>
      <p className="mt-1 ">
        {data.accommodation?.coordinates?.lat}, {data.accommodation?.coordinates?.lng}
      </p>
    </div>

    {/* Day Cards */}
    <div className="space-y-10">
      {data.itinerary.map((day) => (
        <div key={day.day}>
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase">Day {day.day}</p>
            <p className="text-xl font-bold border-b-2 border-gray-100 pb-1">{day.theme}</p>
          </div>
          
          <div className="space-y-6">
            {day.activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1 w-8 text-gray-400 shrink-0">
                  {timeSlotIcon(activity?.time_slot)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-tight text-gray-400">
                      {activity?.time_slot}
                    </span>
                    {activity.is_off_beaten_path && (
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500 border px-1">
                        Hidden Gem
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="font-bold text-md">{activity.location}</span>
                  </div>
                  <p className="mt-1   text-gray-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)
}
const InputDemo = () => {
  const [promptInput, setPromptInput] = useState("");
  const [chatList, setChatList] = useState([]);
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([])
  const [selectedChatId, setSelectedChatId] = useState('')
  const [error, setError] = useState("");
    const user = localStorage.getItem("user")
  const handleClick = async () => {
    if (!promptInput.trim()) return;
    setConversations([...conversations, { role: "user", text: promptInput }]);
    setLoading(true);
    setError("");
    try {
        debugger;
      const { data } = await axios.post("http://localhost:8000/generate", {
        prompt: promptInput,
        conversationId:  selectedChatId
      });
      const parsed: ItineraryData = JSON.parse(data.text);

      setConversations( prev =>  [...prev, { role: "assistant", text: data.text }])
      setItinerary(parsed);
    } catch {
      setError("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleClick();
  };

  const getAllChatTitles = async() => {
    const {data}  = await axios.get("http://localhost:8000/chats?userId=" + JSON.parse(user)._id)
    setChatList(data)
  }

  const addNewChat = async() => {
    const {data}  = await axios.post("http://localhost:8000/newchat?userid=" + JSON.parse(user)._id)
    getAllChatTitles()
  }

  const deleteConv = async(id) => {
    const {data}  = await axios.delete("http://localhost:8000/chats/" + id)
    getAllChatTitles()
  }


  

  const getUserChatByConversation = async() => {
    const {data}  = await axios.get("http://localhost:8000/chats/" + selectedChatId)
    setConversations(JSON.stringify(data))
    console.log(data)
  }

  useEffect(()=>{
    getAllChatTitles()
    getUserChatByConversation()
  },[selectedChatId])

  const userName = JSON.parse(localStorage.getItem("user"))

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 shrink-0 bg-gray-900 p-4 flex flex-col gap-4">
        <Image
          src="/ai itenary.png"
          alt="AI Itinerary Logo"
          width={100}
          height={100}
          className="w-28 h-auto rounded-lg shadow-md"
        />
        <Separator className="bg-gray-700" />
        <div className="text-lg font-bold text-white truncate">
        {userName?.name}

        </div>
        <Button onClick={addNewChat }> <Plus/> Start new chat </Button>
        {chatList.length> 0 ? chatList.map((item,id)=>{
          return (
            <div key={id} onClick={()=> setSelectedChatId(item._id)}  className={item._id===selectedChatId ? "bg-white text-black p-2": "text-white p-2"}>
              {item.title}
              <Trash2 onClick={()=> deleteConv(item._id)}/>
              </div>
          )
        }) : "No chats"}
        {itinerary && (
          <div className="rounded-lg bg-gray-800 p-3 cursor-pointer hover:bg-gray-700 transition-colors">
            <p className="text-white   font-medium truncate">{itinerary.destination}</p>
            <p className="text-gray-400 text-xs">{itinerary.travel_dates_context}</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        <ScrollArea className="flex-1">
          {!itinerary && !loading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-8">
              <Compass className="w-12 h-12 text-rose-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">Plan Your Next Adventure</h2>
              <p className="mt-2 text-gray-500   max-w-sm">
                Describe your dream destination and we&apos;ll craft a personalized day-by-day itinerary.
              </p>
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-rose-400" />
              <p className="  text-gray-500">Crafting your itinerary...</p>
            </div>
          )}
          {error && (
            <div className="m-4 rounded-lg bg-red-50 border border-red-200 p-4   text-red-600">
              {error}
            </div>
          )}

          {conversations.length > 0 && (
            <div className="p-4 space-y-3">

              {JSON.parse(conversations).length> 0 && JSON.parse(conversations)?.map((item)=>{
                return (
                  <div key={item._id}>
                    {item.messages.map((conv, i) => (
                <div key={i} className={`flex items-start gap-3 ${conv.sender === "user" ? "justify-end" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${conv.sender === "user" ? "bg-blue-500" : "bg-gray-500"}`}>
                    {conv.sender === "user" ? <SendIcon className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <p className={`px-3 py-2 rounded-lg ${conv.sender === "user" ? "bg-blue-100 text-blue-800" : "text-gray-800"}`}>
                    {conv?.sender === "user" ?  conv?.userPrompt : <ItineraryView data={conv.userPrompt} />}
                  </p>
                </div>
              ))} 
                  </div>
                )
              })}
             {/**/}
            </div>
          )}
 
        </ScrollArea>

        {/* Input Bar */}
        <div className="border-t bg-white p-3 flex gap-2 items-center">
          <Input
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 3 days in Kathmandu, Nepal in spring..."
            className="flex-1"
          />
          <Button onClick={handleClick} disabled={loading || !promptInput.trim()}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendIcon className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Map Panel */}
      <div className="w-72 shrink-0 border-l relative overflow-hidden">
        <MapPanel
          itinerary ={itinerary}
          center={itinerary?.accommodation?.coordinates}
          label={itinerary?.accommodation?.name}
        />
      </div>
    </div>
  );
};

export default InputDemo;
