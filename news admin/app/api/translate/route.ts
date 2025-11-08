import { NextRequest, NextResponse } from 'next/server';

const translations: { [key: string]: { hindi: string; bengali: string } } = {
  'politics': { hindi: 'राजनीति', bengali: 'রাজনীতি' },
  'sports': { hindi: 'खेल', bengali: 'ক্রীড়া' },
  'cricket': { hindi: 'क्रिकेट', bengali: 'ক্রিকেট' },
  'football': { hindi: 'फुटबॉल', bengali: 'ফুটবল' },
  'business': { hindi: 'व्यापार', bengali: 'ব্যবসা' },
  'technology': { hindi: 'प्रौद्योगिकी', bengali: 'প্রযুক্তি' },
  'entertainment': { hindi: 'मनोरंजन', bengali: 'বিনোদন' },
  'health': { hindi: 'स्वास्थ्य', bengali: 'স্বাস্থ্য' },
  'education': { hindi: 'शिक्षा', bengali: 'শিক্ষা' },
  'world': { hindi: 'विश्व', bengali: 'বিশ্ব' },
  'national': { hindi: 'राष्ट्रीय', bengali: 'জাতীয়' },
  'international': { hindi: 'अंतर्राष्ट्रीय', bengali: 'আন্তর্জাতিক' },
  'crime': { hindi: 'अपराध', bengali: 'অপরাধ' },
  'lifestyle': { hindi: 'जीवनशैली', bengali: 'জীবনধারা' },
  'science': { hindi: 'विज्ञान', bengali: 'বিজ্ঞান' },
  'environment': { hindi: 'पर्यावरण', bengali: 'পরিবেশ' },
  'opinion': { hindi: 'राय', bengali: 'মতামত' },
};

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const lowerText = text.toLowerCase().trim();
    
    if (translations[lowerText]) {
      return NextResponse.json(translations[lowerText]);
    }
    
    return NextResponse.json({ hindi: text, bengali: text });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
