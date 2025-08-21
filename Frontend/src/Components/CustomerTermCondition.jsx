import React, { useState } from "react";

const CustomerTermCondition = () => {
    const [lang, setLang] = useState("en");

    const terms = {
        en: {
            title: "Terms & Conditions For Citizen/Passenger",
            sections: [
                {
                    heading: "1. Booking and Confirmation",
                    text: `All bookings are subject to availability and confirmation.

You must provide accurate and complete information at the time of booking.

Bookings are confirmed only after full or partial payment (as per the terms) is received.`,
                },
                {
                    heading: "2. Pricing",
                    text: `Prices are quoted in rupee and may vary based on availability, taxes, surcharges.

Prices are subject to change without prior notice until full payment is made.

In case of a pricing error, we reserve the right to correct it and either cancel the booking or offer you the option to pay the corrected amount.`,
                },
                {
                    heading: "3. Payment Terms",
                    text: `Full or part payment (as per the booking conditions) must be made at the time of confirmation.

Accepted payment methods: [List your payment options – credit/debit card, bank transfer, UPI, etc.].

In case of non-payment or delayed payment, the booking may be cancelled without notice.`,
                },
                {
                    heading: "4. Cancellation and Refunds",
                    text: `Cancellation policies vary by service provider (airlines, hotels, transport, etc.) and will be communicated at the time of booking.

Refunds (if applicable) will be processed after deducting cancellation fees, service charges, and applicable taxes.

Refund processing time may vary and is subject to third-party policies.`,
                },
                {
                    heading: "5. Amendments and Changes",
                    text: `Any changes to confirmed bookings (e.g., date change, name correction) are subject to availability and applicable charges.

Airlines, hotels, or other suppliers may impose their own amendment fees.

The Company may charge a service fee for processing changes.`,
                },
                {
                    heading: "6. Travel Documents",
                    text: `You are responsible for ensuring that you have valid travel documents, including passport, visa, ID, and necessary permits.

The Company is not responsible for any loss, expense, or delay resulting from missing or incorrect documents.`,
                },
                {
                    heading: "7. Responsibility and Liability",
                    text: `We act as an agent between you and third-party service providers. We are not liable for any deficiency in services provided by airlines, hotels, transport operators, etc.

We are not responsible for any loss, injury, delay, or inconvenience caused due to natural disasters, strikes, cancellations, weather conditions, or other force majeure events.`,
                },
                {
                    heading: "8. Health and Safety",
                    text: `You must ensure you are physically fit to travel.

It is your responsibility to meet any health requirements (e.g., vaccinations, COVID-19 rules) of the destination country.`,
                },
                {
                    heading: "9. Conduct and Behavior",
                    text: `You are expected to behave respectfully and lawfully during the tour or travel.

The Company reserves the right to remove any customer from a trip without refund in case of disruptive or unlawful behavior.`,
                },
                {
                    heading: "10. Travel Insurance",
                    text: `Travel insurance is strongly recommended to cover unforeseen events like trip cancellations, medical emergencies, lost baggage, etc.

The Company is not liable for losses that could have been covered by insurance.`,
                },
                {
                    heading: "11. Complaints and Disputes",
                    text: `If you have any complaint during your trip, you must notify us or the relevant service provider immediately.

Complaints must be submitted in writing within 7 days of completion of travel.

Disputes, if any, shall be subject to the jurisdiction of the courts of [City/Country].`,
                },
                {
                    heading: "12. Use of Customer Information",
                    text: `Your personal data will be used strictly for booking and service-related purposes.

By booking with us, you consent to the collection and processing of your information as per our Privacy Policy.`,
                },
                {
                    heading: "13. Force Majeure",
                    text: `We are not liable for any delay or failure in performance due to events beyond our reasonable control, including but not limited to acts of God, government restrictions, war, riots, and natural disasters.`,
                },
                {
                    heading: "14. Modification of Terms",
                    text: `The Company reserves the right to modify these Terms and Conditions at any time without prior notice.

Continued use of our services after updates implies your acceptance of the revised terms.`,
                },
                {
                    heading: "15. Acceptance",
                    text: `By booking travel services with "All India Travels & Online Services", you acknowledge that you have read, understood, and agreed to these Terms and Conditions.`,
                },
            ],
        },
        hi: {
            title: "नागरिक/यात्री के लिए नियम और शर्तें",
            sections: [
                {
                    heading: "1. बुकिंग और पुष्टि",
                    text: `सभी बुकिंग उपलब्धता और पुष्टि पर निर्भर हैं।

बुकिंग के समय आपको सही और पूरी जानकारी देनी होगी।

बुकिंग तभी पुष्टि होती है जब आंशिक या पूर्ण भुगतान (नियमों के अनुसार) प्राप्त होता है।`,
                },
                {
                    heading: "2. मूल्य निर्धारण",
                    text: `[मुद्रा] में दिए गए मूल्य उपलब्धता, टैक्स, अधिभार और विदेशी मुद्रा दरों के आधार पर बदल सकते हैं।

पूर्ण भुगतान होने तक मूल्य बिना पूर्व सूचना के बदले जा सकते हैं।

यदि मूल्य में कोई गलती होती है, तो हम उसे सुधारने और बुकिंग रद्द करने या सही राशि का भुगतान करने का विकल्प देने का अधिकार रखते हैं।`,
                },
                {
                    heading: "3. भुगतान की शर्तें",
                    text: `बुकिंग की पुष्टि के समय पूर्ण या आंशिक भुगतान (शर्तों के अनुसार) करना आवश्यक है।

स्वीकार्य भुगतान विधियाँ: [क्रेडिट/डेबिट कार्ड, बैंक ट्रांसफर, UPI आदि]।

यदि भुगतान नहीं किया जाता या देर से किया जाता है, तो बुकिंग बिना सूचना रद्द की जा सकती है।`,
                },
                {
                    heading: "4. रद्दीकरण और रिफंड",
                    text: `रद्दीकरण नीतियाँ सेवा प्रदाता (एयरलाइंस, होटल, परिवहन आदि) के अनुसार भिन्न हो सकती हैं और बुकिंग के समय बताई जाएंगी।

रिफंड (यदि लागू हो) रद्दीकरण शुल्क, सेवा शुल्क और टैक्स काटकर दिए जाएंगे।

रिफंड की प्रक्रिया का समय सेवा प्रदाता की नीतियों पर निर्भर करता है।`,
                },
                {
                    heading: "5. संशोधन और परिवर्तन",
                    text: `बुकिंग में किए गए किसी भी बदलाव (जैसे तारीख बदलना, नाम सुधारना) उपलब्धता और शुल्क पर निर्भर करेगा।

एयरलाइंस, होटल या अन्य प्रदाता अपने अलग शुल्क लगा सकते हैं।

कंपनी बदलाव करने के लिए सेवा शुल्क ले सकती है।`,
                },
                {
                    heading: "6. यात्रा दस्तावेज़",
                    text: `आपको यह सुनिश्चित करना होगा कि आपके पास पासपोर्ट, वीजा, पहचान पत्र और आवश्यक परमिट जैसे मान्य यात्रा दस्तावेज़ हों।

ग़लत या अधूरे दस्तावेज़ों के कारण हुए नुकसान या देरी के लिए कंपनी ज़िम्मेदार नहीं होगी।`,
                },
                {
                    heading: "7. ज़िम्मेदारी और दायित्व",
                    text: `हम आपके और तीसरे पक्ष के सेवा प्रदाताओं के बीच एजेंट के रूप में काम करते हैं। एयरलाइंस, होटल, परिवहन प्रदाता आदि की सेवाओं की कमी के लिए हम ज़िम्मेदार नहीं हैं।

प्राकृतिक आपदा, हड़ताल, रद्दीकरण, मौसम या अन्य अप्रत्याशित कारणों से होने वाले नुकसान, देरी या असुविधा के लिए हम ज़िम्मेदार नहीं हैं।`,
                },
                {
                    heading: "8. स्वास्थ्य और सुरक्षा",
                    text: `आपको सुनिश्चित करना होगा कि आप यात्रा के लिए शारीरिक रूप से फिट हैं।

गंतव्य देश की स्वास्थ्य आवश्यकताओं (जैसे टीकाकरण, COVID-19 नियम) का पालन करना आपकी ज़िम्मेदारी है।`,
                },
                {
                    heading: "9. आचरण और व्यवहार",
                    text: `यात्रा के दौरान आपसे सम्मानजनक और क़ानूनी व्यवहार की अपेक्षा की जाती है।

यदि कोई यात्री अनुशासनहीन या अवैध व्यवहार करता है तो कंपनी उसे यात्रा से हटा सकती है और रिफंड नहीं देगी।`,
                },
                {
                    heading: "10. यात्रा बीमा",
                    text: `यात्रा बीमा लेने की दृढ़ता से सिफारिश की जाती है ताकि रद्दीकरण, चिकित्सीय आपात स्थिति, सामान खोने जैसी घटनाओं में सुरक्षा हो सके।

ऐसे नुकसानों के लिए कंपनी ज़िम्मेदार नहीं होगी जिन्हें बीमा कवर कर सकता है।`,
                },
                {
                    heading: "11. शिकायतें और विवाद",
                    text: `यात्रा के दौरान किसी भी शिकायत के लिए आपको तुरंत हमें या संबंधित सेवा प्रदाता को सूचित करना होगा।

यात्रा पूरी होने के 7 दिनों के भीतर लिखित में शिकायत दर्ज करनी होगी।

किसी भी विवाद का निपटारा [शहर/देश] के न्यायालय में होगा।`,
                },
                {
                    heading: "12. ग्राहक जानकारी का उपयोग",
                    text: `आपकी व्यक्तिगत जानकारी केवल बुकिंग और सेवा-संबंधित उद्देश्यों के लिए उपयोग की जाएगी।

हमारे साथ बुकिंग करने पर आप हमारी गोपनीयता नीति के अनुसार अपनी जानकारी के उपयोग के लिए सहमति देते हैं।`,
                },
                {
                    heading: "13. अप्रत्याशित परिस्थितियाँ (Force Majeure)",
                    text: `हम किसी भी देरी या सेवा विफलता के लिए ज़िम्मेदार नहीं हैं यदि वह हमारे नियंत्रण से बाहर है, जैसे प्राकृतिक आपदा, सरकारी नियम, युद्ध, दंगे आदि।`,
                },
                {
                    heading: "14. नियमों में परिवर्तन",
                    text: `कंपनी बिना पूर्व सूचना दिए कभी भी इन नियमों और शर्तों में बदलाव कर सकती है।

हमारी सेवाओं का उपयोग जारी रखने का मतलब होगा कि आप नए नियमों को स्वीकार करते हैं।`,
                },
                {
                    heading: "15. स्वीकृति",
                    text: `[Travel Agency Name] के साथ यात्रा सेवाएँ बुक करने पर आप स्वीकार करते हैं कि आपने इन नियमों और शर्तों को पढ़ा, समझा और सहमति दी है।`,
                },
            ],
        },
    };

    return (
        <div className="p-10 w-full">
            <div className="flex flex-col items-center border rounded-xl p-10">
                {/* Language Switcher */}
                <div className="flex gap-3 mb-5">
                    <button
                        onClick={() => setLang("en")}
                        className={`px-3 rounded-lg ${lang === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setLang("hi")}
                        className={`px-3 rounded-lg ${lang === "hi" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        हिंदी
                    </button>
                </div>

                <h1 className="mb-2 text-black italic font-bold">
                    {terms[lang].title}
                </h1>

                <div className="space-y-4">
                    {terms[lang].sections.map((sec, i) => (
                        <div key={i}>
                            <p className="text-orange-500 font-semibold">{sec.heading}</p>
                            <p className="whitespace-pre-line">{sec.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerTermCondition;
