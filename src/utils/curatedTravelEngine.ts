import { TripPreferences, ItineraryResult, DayItinerary, ChecklistItem, PlaceToVisit, LocalFoodItem, BudgetBreakdown } from '../types/travel';

interface DestinationProfile {
  name: string;
  tagline: string;
  style: string;
  idealDays: number;
  bestSeason: string;
  weather: string;
  reason: string;
  places: PlaceToVisit[];
  foods: LocalFoodItem[];
  tips: string[];
  dayThemes: {
    theme: string;
    morning: { title: string; desc: string; loc: string; cost: number; tip?: string };
    afternoon: { title: string; desc: string; loc: string; cost: number; tip?: string };
    evening: { title: string; desc: string; loc: string; cost: number; tip?: string };
    night: { title: string; desc: string; loc: string; cost: number; tip?: string };
  }[];
}

const DESTINATION_PROFILES: Record<string, DestinationProfile> = {
  goa: {
    name: 'Goa (North & South Coast)',
    tagline: 'Sun-kissed beaches, Portuguese heritage, and vibrant coastal vibes',
    style: 'relaxation',
    idealDays: 4,
    bestSeason: 'November to February (Pleasant winter breeze)',
    weather: 'Sunny & breezy, 26°C - 31°C with clear blue skies',
    reason: 'Perfect balance of scenic sandy beaches, historic colonial forts, fresh seafood shacks, and water sports within an accessible budget.',
    places: [
      { name: 'Aguada Fort & Lighthouse', highlight: '17th-century Portuguese fort overlooking the Arabian Sea', bestTimeToVisit: 'Morning 9:00 AM', entryFeeINR: 50, timing: '09:00 AM - 05:30 PM' },
      { name: 'Palolem Beach & Butterfly Island', highlight: 'Crescent-shaped calm bay ideal for kayaking and dolphin spotting', bestTimeToVisit: 'Early Morning', entryFeeINR: 0, timing: 'All Day' },
      { name: 'Basilica of Bom Jesus', highlight: 'UNESCO World Heritage baroque church in Old Goa', bestTimeToVisit: 'Morning 10:00 AM', entryFeeINR: 0, timing: '09:00 AM - 06:30 PM' },
      { name: 'Anjuna Flea Market / Curlies', highlight: 'Bohemian crafts, live acoustic music, and golden sunset viewpoints', bestTimeToVisit: 'Sunset 05:00 PM', entryFeeINR: 0, timing: '10:00 AM - 10:00 PM' },
    ],
    foods: [
      { name: 'Goan Fish Curry Thali', description: 'Fresh kingfish or pomfret in rich coconut-kokum gravy served with local red rice', vegNonVeg: 'non-veg', recommendedSpot: 'Vinayak Family Restaurant, Assagao', approxPriceINR: 280 },
      { name: 'Bebinca & Serradura', description: 'Traditional multi-layered Goan Portuguese dessert and sawdust pudding', vegNonVeg: 'veg', recommendedSpot: 'Infantaria Cafe, Calangute', approxPriceINR: 180 },
      { name: 'Poi with Mushroom Xacuti', description: 'Crusty local unleavened wheat bread soaked in roasted spice gravy', vegNonVeg: 'veg', recommendedSpot: 'Viva Panjim, Fontainhas', approxPriceINR: 220 },
    ],
    tips: [
      'Rent a two-wheeler (scooter) for ₹350–₹500/day for maximum flexibility in navigating coastal bylanes.',
      'Always confirm water sports package inclusions beforehand and wear life jackets.',
      'Explore Fontainhas Latin Quarter early morning for the best quiet photography light.'
    ],
    dayThemes: [
      {
        theme: 'Coastal Arrival & North Goa Beach Vibe',
        morning: { title: 'Arrival, Check-in & Scooter Rental', desc: 'Arrive in Goa, check in to your stay, grab a quick hearty breakfast and pick up your rental vehicle.', loc: 'Calangute / Candolim', cost: 600, tip: 'Keep digital copy of your driving license handy.' },
        afternoon: { title: 'Aguada Fort & Sinquerim Beach Walk', desc: 'Explore the historic bastion and take in panoramic ocean views from the clifftop.', loc: 'Sinquerim', cost: 150, tip: 'Carry sunglasses and stay hydrated.' },
        evening: { title: 'Sunset at Vagator Beach & Chapora Fort', desc: 'Climb up to the famous "Dil Chahta Hai" fort to witness the spectacular Arabian Sea sunset.', loc: 'Vagator', cost: 50, tip: 'Reach 45 minutes before sunset for the prime ridge view.' },
        night: { title: 'Beachside Dinner & Acoustic Live Music', desc: 'Relax at a beach shack with fresh seafood or Goan curries with soothing ocean waves.', loc: 'Anjuna', cost: 650, tip: 'Try the fresh seasonal catch of the day.' }
      },
      {
        theme: 'Heritage Walk & Old Goa Architectural Wonders',
        morning: { title: 'Fontainhas Latin Quarter Heritage Walk', desc: 'Stroll through picturesque pastel yellow, green, and blue Portuguese colonial villas.', loc: 'Panaji', cost: 200, tip: 'Wear walking shoes; the cobblestone alleys are lovely.' },
        afternoon: { title: 'Old Goa UNESCO Churches & Spice Plantation', desc: 'Visit Basilica of Bom Jesus and Se Cathedral, followed by an aromatic spice farm lunch.', loc: 'Old Goa & Ponda', cost: 600, tip: 'Modest attire is required inside church premises.' },
        evening: { title: 'Mandovi River Sunset Cruise', desc: 'Enjoy a 1-hour cultural catamaran ride with folk Goan and Portuguese dance performances.', loc: 'Panjim Jetty', cost: 500, tip: 'Book the 5:30 PM slot for the best twilight view.' },
        night: { title: 'Dinner at Heritage Bistro & Cafe', desc: 'Dine at an authentic heritage house serving local delicacies and fresh desserts.', loc: 'Panaji', cost: 550, tip: 'Try Bebinca with vanilla ice cream.' }
      },
      {
        theme: 'South Goa Serenity & Scenic Waters',
        morning: { title: 'Scenic Drive to Palolem Beach', desc: 'Enjoy a tranquil morning drive past coconut groves towards the untouched beaches of South Goa.', loc: 'Canacona', cost: 350, tip: 'Leave early to beat midday traffic.' },
        afternoon: { title: 'Kayaking & Butterfly Beach Excursion', desc: 'Paddle calm turquoise waters or hire a short local boat ride to secluded Butterfly Island.', loc: 'Palolem Beach', cost: 700, tip: 'Kayaks cost around ₹300/hour per tandem.' },
        evening: { title: 'Cabo de Rama Fort Cliffside Sunset', desc: 'Gaze out from ancient Portuguese ramparts dropping steeply into the crashing sea waves.', loc: 'Cabo de Rama', cost: 100, tip: 'One of the most cinematic sunset points in all of India.' },
        night: { title: 'Candlelight Seafood by the Shore', desc: 'Enjoy South Goan coconut fish curry and garlic naan under starlit skies.', loc: 'Agonda Beach', cost: 600, tip: 'South Goa shacks close earlier than North Goa; dine by 9:30 PM.' }
      },
      {
        theme: 'Water Adventures & Souvenir Shopping',
        morning: { title: 'Water Sports at Baga or Morjim', desc: 'Try parasailing, jet skiing, or a gentle banana boat ride along the coastline.', loc: 'Baga Beach', cost: 1200, tip: 'Negotiate bundled combo rates for group travelers.' },
        afternoon: { title: 'Local Flea Market & Cashew Shopping', desc: 'Shop for authentic Goan cashews, feni, spices, handmade shell souvenirs, and resortwear.', loc: 'Mapusa / Arpora', cost: 400, tip: 'Taste test cashews for crunchiness before buying.' },
        evening: { title: 'Chilled Sunset Cocktails / Mocktails at Ashwem', desc: 'Unwind on quiet soft white sands watching kitesurfers catch the evening breeze.', loc: 'Ashwem Beach', cost: 350, tip: 'Less crowded and wonderfully peaceful.' },
        night: { title: 'Farewell Dinner & Departure Prep', desc: 'Gather for a celebratory final dinner reminiscing trip highlights before departure.', loc: 'Candolim', cost: 700, tip: 'Pack rental vehicle return receipts and luggage.' }
      }
    ]
  },
  manali: {
    name: 'Manali & Solang Valley (Himachal Pradesh)',
    tagline: 'Snow-capped peaks, pine valleys, and thrilling Himalayan adventures',
    style: 'adventure',
    idealDays: 4,
    bestSeason: 'October to June (Snow in Dec-Feb, lush greenery in Apr-Jun)',
    weather: 'Crisp & cool, 8°C - 18°C (drops to 2°C at high altitudes)',
    reason: 'Offers breathtaking alpine vistas, thrilling high-altitude paragliding, hot sulphur springs, and cozy wooden Himalayan cafes.',
    places: [
      { name: 'Solang Valley & Atal Tunnel', highlight: 'Adventure hub with quad biking, zorbing, and access to Sissu valley', bestTimeToVisit: 'Morning 8:30 AM', entryFeeINR: 0, timing: '08:00 AM - 06:00 PM' },
      { name: 'Hadimba Devi Temple', highlight: 'Historic 1553 AD pagoda-style wooden temple inside towering deodar forest', bestTimeToVisit: 'Morning 10:00 AM', entryFeeINR: 0, timing: '08:00 AM - 06:00 PM' },
      { name: 'Jogini Waterfall Trek', highlight: 'Gentle 3 km nature trek through apple orchards leading to cascading falls', bestTimeToVisit: 'Morning 9:00 AM', entryFeeINR: 0, timing: '08:00 AM - 05:00 PM' },
      { name: 'Old Manali Cafes & Beas River Walk', highlight: 'Vibrant hippie cafes, live indie acoustic music, and wood-fired pizzas', bestTimeToVisit: 'Evening 05:30 PM', entryFeeINR: 0, timing: '11:00 AM - 11:00 PM' }
    ],
    foods: [
      { name: 'Himachali Siddu with Ghee', description: 'Steamed wheat yeast bread stuffed with spiced crushed walnuts, poppy seeds, and lentils', vegNonVeg: 'veg', recommendedSpot: 'Cafe 1947 or Local Dhaba Old Manali', approxPriceINR: 160 },
      { name: 'Fresh Himalayan Trout Fry', description: 'Fresh pan-fried river trout seasoned with lemon, garlic butter, and mountain herbs', vegNonVeg: 'non-veg', recommendedSpot: 'Johnson\'s Cafe, Circuit House Road', approxPriceINR: 550 },
      { name: 'Tibetan Thukpa & Steamed Momos', description: 'Hearty steaming vegetable noodle broth with handcrafted chili dips', vegNonVeg: 'both', recommendedSpot: 'Chopsticks Restaurant, Mall Road', approxPriceINR: 200 }
    ],
    tips: [
      'Layer your clothing: mornings and evenings get chilly even during summer months.',
      'Check Atal Tunnel and Rohtang pass permits online in advance during peak season.',
      'Keep motion sickness tablets if traveling through twisting mountain ghats.'
    ],
    dayThemes: [
      {
        theme: 'Alpine Arrival & Deodar Forest Exploration',
        morning: { title: 'Arrival & Check-in at Wooden Cottage', desc: 'Arrive in Manali, breathe in fresh pine air, check in, and enjoy hot ginger lemon tea.', loc: 'Old Manali', cost: 400, tip: 'Take it easy for the first few hours to acclimatize.' },
        afternoon: { title: 'Hadimba Temple & Van Vihar Forest', desc: 'Walk under ancient 200-year-old towering cedar trees and admire pagoda woodwork.', loc: 'Dhungri Village', cost: 100, tip: 'Do not miss photo with gentle Angora rabbits outside.' },
        evening: { title: 'Mall Road Stroll & Tibetan Monastery', desc: 'Browse handcrafted woolens, Kullu shawls, wooden artifacts, and rotate prayer wheels.', loc: 'Mall Road', cost: 150, tip: 'Mall Road is pedestrian-only; pleasant for evening walks.' },
        night: { title: 'Cozy Riverside Dinner at Cafe 1947', desc: 'Enjoy wood-fired pizza and pasta right next to the rushing Manalsu river streams.', loc: 'Old Manali', cost: 600, tip: 'Sit on the outdoor riverside patio with patio heaters.' }
      },
      {
        theme: 'Solang Valley & Atal Tunnel High Mountain Thrills',
        morning: { title: 'Solang Valley Ropeway & Adventure Sports', desc: 'Cable car ride up the peak followed by paragliding or zorbing over alpine meadows.', loc: 'Solang', cost: 1200, tip: 'Book tandem paragliding only with licensed certified pilots.' },
        afternoon: { title: 'Drive through Atal Tunnel to Sissu (Lahaul)', desc: 'Cross the world\'s longest highway tunnel at 10,000 ft and witness the dramatic trans-Himalayan landscape.', loc: 'Sissu Waterfall', cost: 600, tip: 'Temperature drops sharply once you exit into Lahaul valley.' },
        evening: { title: 'Sissu Lake & Riverbed Chill', desc: 'Marvel at the cascading Sissu waterfall dropping against bare snow-streaked mountains.', loc: 'Lahaul Valley', cost: 100, tip: 'Return before 4:30 PM to avoid evening tunnel traffic.' },
        night: { title: 'Authentic Himachali Dham Feast', desc: 'Savor traditional festival cuisine served on leaf plates with curd-based madra and khatta.', loc: 'Manali Town', cost: 450, tip: 'Extremely nutritious and rich in authentic local flavor.' }
      },
      {
        theme: 'Jogini Falls Trek & Vashisht Hot Springs',
        morning: { title: 'Vashisht Village & Natural Sulphur Springs', desc: 'Visit the 4,000-year-old sage Vashisht temple and take a dip in rejuvenating natural hot springs.', loc: 'Vashisht', cost: 50, tip: 'Separate clean bathing chambers for men and women.' },
        afternoon: { title: 'Scenic Trek to Jogini Waterfall', desc: 'Hike through apple orchards, small streams, and pine trails to reach the thunderous two-tier waterfall.', loc: 'Jogini Falls', cost: 150, tip: 'Wear shoes with good grip; spray makes rocks slippery.' },
        evening: { title: 'Cafe Hopping in Old Manali Alleys', desc: 'Explore quirky boutique stores, bookshops, and sip freshly brewed Himalayan roasted coffee.', loc: 'Old Manali', cost: 250, tip: 'Great place to buy natural mountain honey and apple jam.' },
        night: { title: 'Live Music Night & Himalayan Trout Dinner', desc: 'Listen to indie acoustic musicians playing songs around a cozy fireplace.', loc: 'Club House Road', cost: 650, tip: 'Reserve a table by 8:00 PM.' }
      },
      {
        theme: 'Naggar Castle & Kullu Valley Craft Trails',
        morning: { title: 'Naggar Castle & Nicholas Roerich Art Gallery', desc: 'Visit the medieval wooden-and-stone castle with sweeping views across Kullu valley.', loc: 'Naggar', cost: 300, tip: 'Stunning example of Kathkuni earthquake-resistant architecture.' },
        afternoon: { title: 'Local Orchard Apple Cider & Siddu Tasting', desc: 'Taste freshly pressed organic apple juice and piping hot walnut siddus with pure desi ghee.', loc: 'Naggar Village', cost: 250, tip: 'Buy pure unrefined mountain honey from local farmers.' },
        evening: { title: 'Beas River Rafting or Riverside Quiet Time', desc: 'Experience thrilling grade 2-3 river rafting along the Beas river near Raison.', loc: 'Kullu', cost: 800, tip: 'Carry dry clothes in a waterproof bag.' },
        night: { title: 'Final Souvenir Shopping & Departure', desc: 'Pick up handmade Kullu caps, wool socks, and dry fruits before boarding your bus/flight.', loc: 'Manali Bus Stand', cost: 400, tip: 'Double check luggage and warm jackets.' }
      }
    ]
  },
  jaipur: {
    name: 'Jaipur (The Pink City of Rajasthan)',
    tagline: 'Regal palaces, mighty hill forts, and royal Rajasthani heritage',
    style: 'culture',
    idealDays: 3,
    bestSeason: 'October to March (Crisp pleasant winters)',
    weather: 'Clear sunshine, 18°C - 28°C (evenings pleasantly cool)',
    reason: 'World-renowned royal architecture, majestic Amber Fort elephant trails, colorful bazaars, and rich culinary heritage.',
    places: [
      { name: 'Amber Palace & Maota Lake', highlight: 'UNESCO hilltop fortress with Sheesh Mahal (hall of mirrors) and royal courtyards', bestTimeToVisit: 'Morning 8:30 AM', entryFeeINR: 100, timing: '08:00 AM - 05:30 PM' },
      { name: 'Hawa Mahal (Palace of Winds)', highlight: 'Five-story pink sandstone facade with 953 intricate honeycomb jharokhas', bestTimeToVisit: 'Early Morning 8:00 AM', entryFeeINR: 50, timing: '09:00 AM - 05:00 PM' },
      { name: 'City Palace & Jantar Mantar', highlight: 'Royal residence museum and 18th-century stone astronomical observatory', bestTimeToVisit: 'Afternoon 1:30 PM', entryFeeINR: 300, timing: '09:30 AM - 05:00 PM' },
      { name: 'Nahargarh Fort Sunset Point', highlight: 'High ridge overlooking the glittering Pink City lights at twilight', bestTimeToVisit: 'Sunset 05:15 PM', entryFeeINR: 50, timing: '10:00 AM - 10:00 PM' }
    ],
    foods: [
      { name: 'Authentic Dal Baati Churma', description: 'Crispy wheat dough balls baked on cow-dung coals dipped in ghee, panchmel dal, and sweet churma', vegNonVeg: 'veg', recommendedSpot: 'Laxmi Misthan Bhandar (LMB) or Chokhi Dhani', approxPriceINR: 350 },
      { name: 'Pyaaz Kachori & Lassi', description: 'Flaky deep-fried pastry stuffed with caramelized spiced onions paired with thick earthen pot lassi', vegNonVeg: 'veg', recommendedSpot: 'Rawat Misthan Bhandar, Station Road', approxPriceINR: 120 },
      { name: 'Laal Maas', description: 'Fierce royal mutton curry slow-cooked with fiery Mathania red chillies and smoky cloves', vegNonVeg: 'non-veg', recommendedSpot: 'Handi Restaurant, MI Road', approxPriceINR: 550 }
    ],
    tips: [
      'Buy the Composite Entry Ticket (includes Amber, Nahargarh, Hawa Mahal, Jantar Mantar) to save time and money.',
      'Visit Hawa Mahal from the rooftop cafes opposite (Wind View Cafe) for unobstructed photos.',
      'Bargain politely in Johari and Bapu Bazaars; start around 50-60% of quoted price for textiles.'
    ],
    dayThemes: [
      {
        theme: 'Pink City Landmarks & Royal Observatory',
        morning: { title: 'Hawa Mahal Photo Op & Heritage Breakfast', desc: 'Admire the honeycomb facade in morning sunlight and enjoy hot Pyaaz Kachori with cutting chai.', loc: 'Badi Chaupar', cost: 180, tip: 'Best light strikes the facade between 8:00 AM and 9:30 AM.' },
        afternoon: { title: 'City Palace Museum & Jantar Mantar', desc: 'Walk through royal courtyards, Peacock Gate, and see the world\'s largest stone sundial.', loc: 'City Palace Complex', cost: 450, tip: 'Hire an authorized audio guide for Jantar Mantar to understand the astronomy.' },
        evening: { title: 'Johari Bazaar & Bapu Bazaar Shopping', desc: 'Shop for block-printed Jaipuri quilts, bandhani dupattas, lac bangles, and blue pottery.', loc: 'Old City Gates', cost: 300, tip: 'Sample sweet Ghewar at LMB in Johari Bazaar.' },
        night: { title: 'Rooftop Rajasthani Thali Dinner', desc: 'Dine under illuminated palace views with rich Gatte ki Sabzi and Ker Sangri.', loc: 'MI Road', cost: 500, tip: 'Try the traditional buttermilk chhaas.' }
      },
      {
        theme: 'Amber Fort Majesty & Nahargarh Ridge Sunset',
        morning: { title: 'Amber Fort & Sheesh Mahal Tour', desc: 'Climb up the majestic cobblestone ramparts, admire the mirror palace, and view Maota lake reflections.', loc: 'Amer', cost: 350, tip: 'Arrive early at 8:30 AM to beat tourist buses.' },
        afternoon: { title: 'Panna Meena ka Kund & Jal Mahal', desc: 'Marvel at the hypnotic symmetrical geometric stepwell and photograph the palace floating in Man Sagar lake.', loc: 'Amer / Jal Mahal', cost: 100, tip: 'Jal Mahal is viewed from the lakeside promenade.' },
        evening: { title: 'Nahargarh Fort Sunset over Jaipur Skyline', desc: 'Watch the entire city turn golden from the Padao restaurant ridge on the Aravalli hills.', loc: 'Nahargarh Fort', cost: 250, tip: 'Book an auto-rickshaw round-trip; getting transport back from the top is difficult.' },
        night: { title: 'Royal Dinner with Live Sarangi Music', desc: 'Enjoy succulent Laal Maas or rich Shahi Paneer accompanied by soulful live Rajasthani folk strings.', loc: 'Amer Road', cost: 700, tip: 'Incredible atmosphere with warm hospitality.' }
      },
      {
        theme: 'Stepwells, Blue Pottery & Heritage Farewell',
        morning: { title: 'Galtaji Monkey Temple & Surya Mandir', desc: 'Explore the ancient natural spring temple set between mountain cliffs with panoramic dawn views.', loc: 'Galta Ji', cost: 100, tip: 'Hold your cameras and bags tightly around playful monkeys.' },
        afternoon: { title: 'Albert Hall Museum & Blue Pottery Workshop', desc: 'Admire Indo-Saracenic museum architecture and watch master artisans hand-paint blue ceramic pottery.', loc: 'Ram Niwas Garden', cost: 250, tip: 'Blue pottery is lead-free and makes durable gifts.' },
        evening: { title: 'Chokhi Dhani Cultural Village Experience', desc: 'Immerse in puppet shows, camel rides, Kalbeliya folk dancing, and royal hospitality.', loc: 'Tonk Road', cost: 900, tip: 'Traditional sit-down floor dining feast is included in entry.' },
        night: { title: 'Final Packing & Departure', desc: 'Collect souvenir packages and proceed to railway station or airport with sweet royal memories.', loc: 'Jaipur Junction', cost: 200, tip: 'Keep delicate blue pottery carefully padded.' }
      }
    ]
  },
  kerala: {
    name: 'Kerala Backwaters & Munnar Hills',
    tagline: 'God’s own country of tranquil canals, tea gardens, and ayurvedic serenity',
    style: 'nature',
    idealDays: 4,
    bestSeason: 'September to March (Lush, green, and pleasantly calm)',
    weather: 'Tropical, 22°C - 30°C in plains, cool 14°C - 20°C in tea hills',
    reason: 'Serene palm-fringed houseboats, rolling emerald tea estates, spice plantations, and therapeutic wellness retreats.',
    places: [
      { name: 'Alleppey Backwaters & Vembanad Lake', highlight: 'Cruising through mirror-like canals in traditional wood-and-coir kettuvallam', bestTimeToVisit: 'Morning 11:00 AM', entryFeeINR: 800, timing: '11:30 AM - 05:30 PM' },
      { name: 'Munnar Tea Plantations & Top Station', highlight: 'Endless rolling emerald green tea carpets and misty valley views', bestTimeToVisit: 'Morning 8:30 AM', entryFeeINR: 50, timing: '08:00 AM - 05:00 PM' },
      { name: 'Fort Kochi Chinese Fishing Nets', highlight: 'Ancient cantilevered fishing nets and colonial spice warehouse streets', bestTimeToVisit: 'Sunset 05:30 PM', entryFeeINR: 0, timing: 'All Day' },
      { name: 'Eravikulam National Park', highlight: 'Home to the endangered Nilgiri Tahr mountain goat and blooming Neelakurinji', bestTimeToVisit: 'Morning 9:00 AM', entryFeeINR: 200, timing: '08:00 AM - 04:00 PM' }
    ],
    foods: [
      { name: 'Kerala Sadya on Banana Leaf', description: '24-dish vegetarian feast with red matta rice, avial, sambar, olan, payasam, and crisp banana chips', vegNonVeg: 'veg', recommendedSpot: 'Mothers Veg Plaza or Houseboat Lunch', approxPriceINR: 250 },
      { name: 'Appam with Stew / Karimeen Pollichathu', description: 'Lacy fermented rice hoppers with vegetable coconut stew or pearl spot fish baked in banana leaves', vegNonVeg: 'both', recommendedSpot: 'Grand Pavilion or Dal Roti, Fort Kochi', approxPriceINR: 380 },
      { name: 'Puttu and Kadala Curry', description: 'Steamed cylindrical rice flour cakes layered with coconut, served with spicy black chickpea curry', vegNonVeg: 'veg', recommendedSpot: 'Local Tea Stalls & Udupi Cafes', approxPriceINR: 90 }
    ],
    tips: [
      'For Alleppey, day cruises (shikara boats) cost ₹600–₹800/hour and reach narrow canals houseboats cannot enter.',
      'Purchase fresh organic spices (cardamom, cinnamon, pepper) directly from spice cooperative stores in Munnar.',
      'Carry light rain gear as pleasant passing showers can happen anytime in God’s Own Country.'
    ],
    dayThemes: [
      {
        theme: 'Historic Fort Kochi & Spice Trade Trails',
        morning: { title: 'Arrival in Kochi & Jew Town Walk', desc: 'Stroll past antique spice warehouses, Jewish Synagogue, and art cafes in Mattancherry.', loc: 'Fort Kochi', cost: 250, tip: 'Great place to buy natural essential oils and handmade paper.' },
        afternoon: { title: 'Chinese Fishing Nets & Dutch Palace', desc: 'Watch fishermen lower massive counter-weighted wooden nets into the Arabian Sea.', loc: 'Kochi Harbour', cost: 100, tip: 'Tip the fishermen a small amount if you want to help pull the nets.' },
        evening: { title: 'Kathakali Dance & Kalaripayattu Martial Arts Show', desc: 'Watch performers apply intricate organic facial makeup and present classical epic theatre.', loc: 'Kerala Kathakali Centre', cost: 400, tip: 'Arrive by 5:00 PM to watch the fascinating makeup ritual.' },
        night: { title: 'Seafood Cafe Dinner by the Promenade', desc: 'Dine on fresh appams and fish moilee under swaying coconut palms.', loc: 'Princess Street', cost: 550, tip: 'Try the tender coconut pudding.' }
      },
      {
        theme: 'Scenic Ascent into Munnar Emerald Tea Hills',
        morning: { title: 'Drive to Munnar past Cheeyappara Waterfalls', desc: 'Watch the scenery transform from coastal palms to mist-clad mountain tea slopes.', loc: 'NH 85 Ghat Road', cost: 350, tip: 'Stop for piping hot cardamom tea and banana fritters on the way.' },
        afternoon: { title: 'Tea Museum & Plantation Factory Tour', desc: 'Learn how fresh tea leaves are plucked, crushed, oxidized, and graded into CTC and orthodox tea.', loc: 'KDHP Tea Museum', cost: 150, tip: 'Taste green tea and silver tip white tea.' },
        evening: { title: 'Echo Point & Kundala Lake Boating', desc: 'Shout into the tranquil valley to hear clear acoustic echoes and enjoy a pedal boat ride.', loc: 'Mattupetty Road', cost: 200, tip: 'Surrounded by rare eucalyptus and pine groves.' },
        night: { title: 'Cozy Mountain Dinner with Campfire', desc: 'Dine on warm Kerala parottas and rich stew while mountain mist blankets the valley.', loc: 'Munnar Hilltop', cost: 450, tip: 'Nights get chilly; carry a woolen shawl or light fleece.' }
      },
      {
        theme: 'Alleppey Backwaters & Kettuvallam Day Cruise',
        morning: { title: 'Descent to Alleppey Backwaters Hub', desc: 'Drive down to the tranquil canal network connecting coconut-fringed villages.', loc: 'Alleppey Finishing Point', cost: 400, tip: 'Boarding begins around 11:30 AM.' },
        afternoon: { title: 'Traditional Houseboat or Shikara Cruise', desc: 'Glide silently past lush paddy fields, duck farms, village school boats, and blooming water lilies.', loc: 'Vembanad Lake', cost: 1000, tip: 'Freshly cooked traditional lunch served on board.' },
        evening: { title: 'Village Walking & Toddy Shop Culinary Stop', desc: 'Walk along the narrow embankments and observe traditional coir rope weaving by village women.', loc: 'Kuttanad Village', cost: 150, tip: 'Sample sweet fresh coconut water straight from trees.' },
        night: { title: 'Lakeside Resort Dinner & Night Stargazing', desc: 'Enjoy peaceful dinner by the water with gentle frog chirps and sparkling fireflies.', loc: 'Alleppey Coast', cost: 500, tip: 'Apply herbal mosquito repellent outdoors in the evening.' }
      },
      {
        theme: 'Marari Beach Relaxation & Farewell Kerala',
        morning: { title: 'Sunrise Stroll on Pristine Marari Beach', desc: 'Walk on clean quiet white sands watching local fishermen launch wooden catamaran boats.', loc: 'Mararikulam', cost: 50, tip: 'Far less commercial than other southern beaches; absolute peace.' },
        afternoon: { title: 'Ayurvedic Abhyanga Massage Session', desc: 'Experience traditional Kerala warm herbal oil therapy to rejuvenate tired muscles.', loc: 'Certified Ayurvedic Centre', cost: 1200, tip: 'Ensure center is accredited by Kerala Tourism Department.' },
        evening: { title: 'Banana Chip & Spice Shopping', desc: 'Buy freshly sliced banana chips fried in pure coconut oil and vacuum-packed spices.', loc: 'Alappuzha Market', cost: 400, tip: 'Try the spicy tapioca chips as well.' },
        night: { title: 'Depart for Kochi Airport / Railway Station', desc: 'Conclude your serene Kerala trip refreshed and energized.', loc: 'Kochi Airport', cost: 600, tip: 'Allow 2 hours for drive to Cochin International Airport.' }
      }
    ]
  }
};

export function generateSmartCuratedItinerary(pref: TripPreferences): ItineraryResult {
  // Determine best destination key
  const destInput = (pref.destination || '').toLowerCase().trim();
  let key = 'goa'; // default fallback

  if (destInput.includes('manali') || destInput.includes('himachal') || destInput.includes('mountain') || destInput.includes('shimla') || destInput.includes('snow')) {
    key = 'manali';
  } else if (destInput.includes('jaipur') || destInput.includes('rajasthan') || destInput.includes('udaipur') || destInput.includes('fort')) {
    key = 'jaipur';
  } else if (destInput.includes('kerala') || destInput.includes('munnar') || destInput.includes('backwater')) {
    key = 'kerala';
  } else if (destInput.includes('goa') || destInput.includes('beach')) {
    key = 'goa';
  } else {
    // Pick based on style if destination is unspecified or generic
    if (pref.travelStyle === 'adventure') key = 'manali';
    else if (pref.travelStyle === 'culture') key = 'jaipur';
    else if (pref.travelStyle === 'nature') key = 'kerala';
    else if (pref.travelStyle === 'food') key = 'jaipur';
    else key = 'goa';
  }

  const profile = DESTINATION_PROFILES[key] || DESTINATION_PROFILES['goa'];
  const targetDays = Math.max(2, Math.min(pref.durationDays || profile.idealDays, 7));
  const travelers = Math.max(1, pref.travelersCount || 1);

  // Generate days by slicing/looping dayThemes
  const days: DayItinerary[] = [];
  for (let i = 0; i < targetDays; i++) {
    const template = profile.dayThemes[i % profile.dayThemes.length];
    const dayNum = i + 1;
    const morningCost = template.morning.cost * travelers;
    const afternoonCost = template.afternoon.cost * travelers;
    const eveningCost = template.evening.cost * travelers;
    const nightCost = template.night.cost * travelers;
    const totalDayCost = morningCost + afternoonCost + eveningCost + nightCost;

    days.push({
      dayNumber: dayNum,
      theme: `Day ${dayNum}: ${template.theme}`,
      morning: {
        time: '08:30 AM - 12:30 PM',
        title: template.morning.title,
        description: template.morning.desc,
        location: template.morning.loc,
        category: 'sightseeing',
        estimatedCostINR: morningCost,
        insiderTip: template.morning.tip
      },
      afternoon: {
        time: '01:00 PM - 04:30 PM',
        title: template.afternoon.title,
        description: template.afternoon.desc,
        location: template.afternoon.loc,
        category: 'sightseeing',
        estimatedCostINR: afternoonCost,
        insiderTip: template.afternoon.tip
      },
      evening: {
        time: '05:00 PM - 07:30 PM',
        title: template.evening.title,
        description: template.evening.desc,
        location: template.evening.loc,
        category: 'leisure',
        estimatedCostINR: eveningCost,
        insiderTip: template.evening.tip
      },
      night: {
        time: '08:00 PM - 10:30 PM',
        title: template.night.title,
        description: template.night.desc,
        location: template.night.loc,
        category: 'food',
        estimatedCostINR: nightCost,
        insiderTip: template.night.tip
      },
      dayExpenseINR: totalDayCost
    });
  }

  // Realistic Budget Calculation
  // 1. Transportation based on preference & travelers
  let baseTransitPerPerson = 2500; // train default
  if (pref.transportation === 'flight') baseTransitPerPerson = 6500;
  else if (pref.transportation === 'bus') baseTransitPerPerson = 1400;
  else if (pref.transportation === 'drive') baseTransitPerPerson = 2000;
  else if (pref.transportation === 'train') baseTransitPerPerson = 1800;
  else baseTransitPerPerson = 3000; // flexible
  const totalTransport = Math.round(baseTransitPerPerson * travelers);

  // 2. Accommodation per night based on preference
  let costPerRoomNight = 2500;
  if (pref.accommodation === 'hostel') costPerRoomNight = 800 * travelers; // dorm bed per person
  else if (pref.accommodation === 'homestay') costPerRoomNight = 1800 * Math.ceil(travelers / 2);
  else if (pref.accommodation === 'midrange') costPerRoomNight = 3200 * Math.ceil(travelers / 2);
  else if (pref.accommodation === 'luxury') costPerRoomNight = 8500 * Math.ceil(travelers / 2);
  const totalAccommodation = Math.round(costPerRoomNight * (targetDays - 1 > 0 ? targetDays - 1 : 1));

  // 3. Food & Dining
  let dailyFoodPerPerson = 700;
  if (pref.travelStyle === 'food' || pref.accommodation === 'luxury') dailyFoodPerPerson = 1200;
  if (pref.accommodation === 'hostel') dailyFoodPerPerson = 500;
  const totalFood = Math.round(dailyFoodPerPerson * targetDays * travelers);

  // 4. Activities & Entry
  const totalActivities = Math.round(days.reduce((acc, d) => acc + (d.morning.estimatedCostINR + d.afternoon.estimatedCostINR) * 0.4, 0));

  // 5. Emergency buffer
  const subtotal = totalTransport + totalAccommodation + totalFood + totalActivities;
  const emergencyBuffer = Math.round(subtotal * 0.10);
  const totalEstimatedCost = subtotal + emergencyBuffer;
  const perPersonCost = Math.round(totalEstimatedCost / travelers);

  // Compare with user's target budget
  const userBudget = pref.budgetINR || totalEstimatedCost;
  let budgetStatus: 'under_budget' | 'on_target' | 'exceeds_budget' = 'on_target';
  let savingsAdvice = 'Your budget matches well with estimated travel and accommodation costs in this category.';

  if (totalEstimatedCost > userBudget * 1.15) {
    budgetStatus = 'exceeds_budget';
    const diff = totalEstimatedCost - userBudget;
    savingsAdvice = `Estimated cost is ₹${diff.toLocaleString('en-IN')} higher than your specified target. Tip: Switching to sleeper/3AC trains or choosing a top-rated cozy homestay can comfortably reduce expenses by ~₹${Math.round(diff * 0.7).toLocaleString('en-IN')}.`;
  } else if (totalEstimatedCost < userBudget * 0.85) {
    budgetStatus = 'under_budget';
    const surplus = userBudget - totalEstimatedCost;
    savingsAdvice = `You have a healthy surplus of ₹${surplus.toLocaleString('en-IN')}! You could upgrade to a premium boutique stay or indulge in a fine-dining regional banquet without exceeding your limit.`;
  }

  const budgetBreakdown: BudgetBreakdown = {
    transportationCost: totalTransport,
    accommodationCost: totalAccommodation,
    foodAndDiningCost: totalFood,
    activitiesAndEntry: totalActivities,
    miscellaneousEmergency: emergencyBuffer,
    totalEstimatedCost,
    perPersonCost,
    status: budgetStatus,
    savingsAdvice
  };

  // Smart Packing Checklist
  const packingChecklist: ChecklistItem[] = [
    { id: 'chk-1', category: 'Documents & Money', text: 'Government ID Cards (Aadhaar / Voter ID / Passport) + 2 photocopies', isChecked: true },
    { id: 'chk-2', category: 'Documents & Money', text: 'Printed or offline digital copies of flight/train tickets and hotel vouchers', isChecked: true },
    { id: 'chk-3', category: 'Documents & Money', text: 'Cash in small denominations (₹50, ₹100, ₹200) for local cabs and toll booths', isChecked: false },
    { id: 'chk-4', category: 'Clothing & Wearables', text: key === 'manali' ? 'Thermal innerwear, fleece jacket, gloves, and woolen socks' : 'Light breathable cotton outfits, UV sunglasses, and sun hat', isChecked: false },
    { id: 'chk-5', category: 'Clothing & Wearables', text: 'Comfortable walking/hiking shoes with non-slip soles + extra flip-flops', isChecked: true },
    { id: 'chk-6', category: 'Electronics & Gadgets', text: '10,000+ mAh Power bank and multi-pin charging cable', isChecked: true },
    { id: 'chk-7', category: 'Electronics & Gadgets', text: 'Waterproof phone pouch and camera / extra memory card', isChecked: false },
    { id: 'chk-8', category: 'Toiletries & Hygiene', text: 'Sunscreen lotion (SPF 50+), lip balm, and insect repellent cream', isChecked: false },
    { id: 'chk-9', category: 'Health & First Aid', text: 'First-aid kit with band-aids, Paracetamol, ORS electrolytes, and motion sickness pills', isChecked: true },
    { id: 'chk-10', category: 'Trip Specific', text: key === 'goa' ? 'Quick-dry microfiber beach towel and swimwear' : key === 'kerala' ? 'Compact umbrella and light cotton full-sleeve shirt for temples' : 'Light cotton scarf for heritage palace visits and sun protection', isChecked: false },
  ];

  const destinationName = pref.suggestForMe || !pref.destination ? profile.name : pref.destination;

  return {
    id: 'trip_' + Date.now().toString(36),
    createdAt: new Date().toISOString(),
    destination: destinationName,
    tagline: profile.tagline,
    reasonForRecommendation: pref.suggestForMe 
      ? `We selected ${destinationName} because it matches your preferred ${pref.travelStyle} style, offering an ideal ${targetDays}-day experience from ${pref.startingCity || 'your location'} within your ₹${(pref.budgetINR || totalEstimatedCost).toLocaleString('en-IN')} budget.`
      : profile.reason,
    bestSeason: profile.bestSeason,
    weatherForecast: profile.weather,
    durationDays: targetDays,
    days,
    budgetBreakdown,
    placesToVisit: profile.places,
    localFoods: profile.foods,
    packingChecklist,
    importantTravelTips: profile.tips,
    dataSource: 'smart_curated_engine'
  };
}
