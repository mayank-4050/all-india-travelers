import React from 'react';
import { Headset, ShieldCheck, MessageSquare } from 'lucide-react';

const CustomerSupport = () => {
  const supportData = [
    {
      icon: <Headset className="w-10 h-10 text-blue-600" />,
      title: '24/7 Customer Support',
      description:
        "We're always here for you! Whether you have a query before booking, need help during your journey, or want support afterward — our dedicated support team is just a call or message away. Travel with peace of mind knowing we’ve got your back, anytime, anywhere.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
      title: 'Reliable Support Services',
      description:
        "At All India Travelers, customer satisfaction is our top priority. Our expert support team ensures every query is resolved quickly and professionally. From booking assistance to post-trip help, we’re committed to providing a smooth and hassle-free experience.",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-purple-600" />,
      title: 'Need Help? We’re Just a Tap Away!',
      description:
        "Chat with us, call our helpline, or drop an email — our support team is available through multiple channels to serve you better. No bots, just real people ready to assist you with care.",
    },
  ];

  return (
    <div className="w-full py-12 bg-gray-50 flex justify-center">
      <div className="w-[95%] max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Customer Support & Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {supportData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300 flex flex-col items-start gap-4 border-t-4 border-blue-500"
            >
              <div>{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
