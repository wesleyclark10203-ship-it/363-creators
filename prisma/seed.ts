import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.payment.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.report.deleteMany()
  await prisma.fileAsset.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.message.deleteMany()
  await prisma.contentApproval.deleteMany()
  await prisma.socialPost.deleteMany()
  await prisma.projectMilestone.deleteMany()
  await prisma.project.deleteMany()
  await prisma.consultation.deleteMany()
  await prisma.quote.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.pricingPlan.deleteMany()
  await prisma.portfolioProject.deleteMany()
  await prisma.service.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.siteSetting.deleteMany()
  await prisma.clientProfile.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await bcrypt.hash('wesleyclark', 10)
  const clientPasswordHash = await bcrypt.hash('client123', 10)

  // 1. Create Users & Clients
  const adminUser = await prisma.user.create({
    data: {
      email: 'wesleyclark10203@gmail.com',
      passwordHash,
      name: 'Wesley Clark',
      role: 'SUPER_ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    },
  })

  const client1User = await prisma.user.create({
    data: {
      email: 'client@safari.co.ke',
      passwordHash: clientPasswordHash,
      name: 'David Kimani',
      role: 'CLIENT',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      clientProfile: {
        create: {
          companyName: 'Safari Trails East Africa',
          industry: 'Tourism & Hospitality',
          phone: '+254 712 345678',
          whatsapp: '+254 712 345678',
          website: 'https://safaritrails.co.ke',
          address: 'Karen Office Park, Nairobi, Kenya',
        },
      },
    },
    include: { clientProfile: true },
  })

  const client2User = await prisma.user.create({
    data: {
      email: 'marketing@savannahbistro.com',
      passwordHash: clientPasswordHash,
      name: 'Amina Mohamed',
      role: 'CLIENT',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      clientProfile: {
        create: {
          companyName: 'Savannah Bistro Nairobi',
          industry: 'Food & Beverage',
          phone: '+254 722 987654',
          whatsapp: '+254 722 987654',
          website: 'https://savannahbistro.com',
          address: 'Westlands, Nairobi, Kenya',
        },
      },
    },
    include: { clientProfile: true },
  })

  const client3User = await prisma.user.create({
    data: {
      email: 'info@nexusrealestate.co.ke',
      passwordHash: clientPasswordHash,
      name: 'Brian Omondi',
      role: 'CLIENT',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      clientProfile: {
        create: {
          companyName: 'Nexus Heights Properties',
          industry: 'Real Estate',
          phone: '+254 733 112233',
          whatsapp: '+254 733 112233',
          website: 'https://nexusrealestate.co.ke',
          address: 'Kilimani, Nairobi, Kenya',
        },
      },
    },
    include: { clientProfile: true },
  })

  console.log('✅ Users & Clients created')

  // 2. Services
  const servicesData = [
    {
      title: 'Social Media Management',
      slug: 'social-media-management',
      icon: 'Share2',
      category: 'Social Media',
      shortDesc: 'Strategic content, graphic design, community management and viral short-form growth across Instagram, TikTok & LinkedIn.',
      description: 'We turn your social channels into dynamic customer acquisition engines through data-driven strategy, creative storytelling, hyper-engaging content calendars, and active community management.',
      features: JSON.stringify([
        'Custom Monthly Content Calendar',
        'High-Impact Graphic & Reel Production',
        'Professional Copywriting & Hashtag Strategy',
        'Multi-Platform Scheduling & Publishing',
        '24/7 Community Engagement & DM Management',
        'Monthly ROI & Growth Performance Reports'
      ]),
      benefits: JSON.stringify([
        'Increase brand awareness and audience trust',
        'Generate qualified leads directly from social platforms',
        'Consistent, high-quality brand voice across all touchpoints',
        'Save 40+ hours per month of internal team time'
      ]),
      deliverables: JSON.stringify([
        '16-24 Custom Social Posts per Month',
        '4-8 Short-Form Video Reels/TikToks',
        'Approved Monthly Strategy Deck',
        'Comprehensive Analytics Dashboard'
      ]),
      process: JSON.stringify([
        'Audience & Competitor Audit',
        'Content Strategy & Pillar Definition',
        'Batch Content Production & Design',
        'Client Approval via 363 Portal',
        'Scheduled Publishing & Community Management',
        'Performance Optimization & Reporting'
      ]),
      faqs: JSON.stringify([
        { q: 'Which platforms do you manage?', a: 'We manage Instagram, Facebook, TikTok, LinkedIn, X (Twitter), and YouTube Shorts.' },
        { q: 'Can we review and approve posts before they go live?', a: 'Yes! Our custom 363 Client Portal allows you to approve posts or request changes in 1-click.' },
        { q: 'Do you create original video content?', a: 'Absolutely. Our content team conducts on-site shoots or works with your raw footage to create viral Reels & TikToks.' }
      ]),
      isFeatured: true,
      order: 1,
    },
    {
      title: 'Website Design & Development',
      slug: 'website-development',
      icon: 'Layout',
      category: 'Development',
      shortDesc: 'Custom high-converting web applications, e-commerce stores, and corporate platforms built with modern technology.',
      description: 'Your website is your 24/7 digital flagship store. We engineer lightning-fast, beautifully designed, responsive web experiences optimized for conversion, SEO, and seamless user experience.',
      features: JSON.stringify([
        'Custom UI/UX Mobile-First Design',
        'Next.js & React High-Performance Architecture',
        'M-Pesa & Credit Card Payment Integrations',
        'Custom Admin CMS & Content Control',
        'Full Technical SEO & Core Web Vitals Optimization',
        'Enterprise Security & SSL Certificate Setup'
      ]),
      benefits: JSON.stringify([
        'Convert up to 3x more website visitors into paying clients',
        'Sub-second load times for maximum search engine ranking',
        'Fully scalable platform ready for millions of visitors',
        'Zero reliance on clunky plugin stacks'
      ]),
      deliverables: JSON.stringify([
        'Complete Interactive UI/UX Figma Prototypes',
        'Fully Functional Responsive Next.js Web App',
        'Payment & WhatsApp API Integration',
        'Content Management Training & Documentation'
      ]),
      process: JSON.stringify([
        'Discovery & Wireframing',
        'UI/UX Visual Design',
        'Frontend & Backend Engineering',
        'Quality Assurance & Speed Testing',
        'Launch & Continuous Support'
      ]),
      faqs: JSON.stringify([
        { q: 'How long does a web project take?', a: 'Standard business sites take 3-4 weeks. Complex web applications take 6-10 weeks.' },
        { q: 'Can we edit content after launch?', a: 'Yes, we equip your site with an intuitive CMS so you can update text, images, products, and blogs with ease.' }
      ]),
      isFeatured: true,
      order: 2,
    },
    {
      title: 'Digital Marketing & Ads',
      slug: 'digital-marketing',
      icon: 'TrendingUp',
      category: 'Marketing',
      shortDesc: 'ROI-focused ad campaigns on Meta, Google, and TikTok to acquire high-value customers at scale.',
      description: 'We craft high-converting ad funnels that target your exact ideal customer in Kenya and internationally. Stop wasting ad spend and start generating predictable revenue.',
      features: JSON.stringify([
        'Multi-Platform Ad Campaigns (Meta, Google, TikTok)',
        'Audience Segmentation & Retargeting Funnels',
        'High-Converting Ad Copy & Creative Production',
        'Conversion Rate Optimization (CRO)',
        'Real-time ROAS (Return On Ad Spend) Tracking'
      ]),
      benefits: JSON.stringify([
        'Predictable customer acquisition funnel',
        'Transparent reporting with clear cost-per-lead (CPL)',
        'Scalable campaigns adjusted for market trends'
      ]),
      deliverables: JSON.stringify([
        'Custom Campaign Strategy Document',
        '10+ Ad Creative Variations per Campaign',
        'Live Ads Manager Setup & Pixel Tracking',
        'Bi-weekly Performance Review Calls'
      ]),
      process: JSON.stringify([
        'Offer & Funnel Architecture',
        'Creative & Copywriting Production',
        'Tracking Pixel & Event Setup',
        'Campaign Launch & A/B Testing',
        'Scaling High-Performing Creatives'
      ]),
      faqs: JSON.stringify([
        { q: 'What budget is needed for paid ads?', a: 'We recommend starting with a minimum ad spend of KSh 30,000/month for optimal testing and results.' }
      ]),
      isFeatured: true,
      order: 3,
    },
    {
      title: 'Branding & Creative Design',
      slug: 'branding',
      icon: 'Palette',
      category: 'Branding',
      shortDesc: 'Memorable brand identity systems, logo design, typography, brand guidelines, and print collaterals.',
      description: 'A powerful brand sets you apart from competitors. We craft distinct visual identity systems that communicate prestige, authority, and emotional connection.',
      features: JSON.stringify([
        'Primary & Secondary Logo Design',
        'Color Palette & Typography Systems',
        'Comprehensive Brand Guidelines Book',
        'Social Media Templates & Stationery Setup'
      ]),
      benefits: JSON.stringify([
        'Stand out in crowded markets',
        'Command premium pricing for your offerings',
        'Instantly build trust with corporate and retail clients'
      ]),
      deliverables: JSON.stringify([
        'Vector Logo Suite (AI, SVG, PNG, PDF)',
        '30+ Page Brand Guideline Manual',
        'Business Cards, Letterhead, & Pitch Deck Templates'
      ]),
      process: JSON.stringify([
        'Brand Discovery & Moodboards',
        'Logo Concepts & Visual Explorations',
        'Refinement & Guideline Construction',
        'Asset Package Delivery'
      ]),
      faqs: JSON.stringify([
        { q: 'How many logo options will we receive?', a: 'We provide 3 distinct creative directions and offer up to 3 rounds of refinements on the chosen concept.' }
      ]),
      isFeatured: true,
      order: 4,
    },
    {
      title: 'Content Creation & Video',
      slug: 'content-creation',
      icon: 'Video',
      category: 'Creative',
      shortDesc: 'Professional photography, commercial videography, drone footage, and high-impact brand stories.',
      description: 'High-quality visuals are essential to capturing attention in today’s feed-scrolling world. We produce studio-grade photos and cinematic video content tailored for social media and marketing campaigns.',
      features: JSON.stringify(['4K Video Production', 'Commercial Product Photography', 'Drone Aerial Footage', 'Professional Audio & Motion Graphics']),
      benefits: JSON.stringify(['Elevate your brand perception', 'Boost engagement on social platforms', 'Provide versatile assets for website and ads']),
      deliverables: JSON.stringify(['Edited High-Res Photo Library', 'Cinematic Brand Video (60s)', '10 short vertical reels']),
      process: JSON.stringify(['Creative Concept & Storyboard', 'Production Day Shoot', 'Post-Production Editing & Color Grading', 'Delivery']),
      faqs: JSON.stringify([{ q: 'Where are shoots conducted?', a: 'We shoot on-location across Kenya and East Africa or in our studio environment.' }]),
      isFeatured: true,
      order: 5,
    },
    {
      title: 'Search Engine Optimization (SEO)',
      slug: 'seo',
      icon: 'Search',
      category: 'Marketing',
      shortDesc: 'Rank #1 on Google search results for valuable keywords in your industry.',
      description: 'Dominate search rankings in Kenya and globally. Our technical, on-page, and local SEO strategies drive continuous organic traffic to your business.',
      features: JSON.stringify(['Comprehensive Keyword Research', 'Technical SEO Audit & Fixes', 'Local Google Business Profile Optimization', 'High-Domain Backlink Building']),
      benefits: JSON.stringify(['Free organic leads without paying for every click', 'Build long-term digital real estate value', 'Establish domain authority']),
      deliverables: JSON.stringify(['Monthly Organic Ranking Reports', 'Optimized Landing Page Copy', 'Technical Schema Markup Setup']),
      process: JSON.stringify(['SEO Audit', 'Keyword Strategy', 'On-Page Optimization', 'Content Creation & Link Acquisition']),
      faqs: JSON.stringify([{ q: 'How long until we see SEO results?', a: 'Noticeable rank improvements typically begin within 60-90 days.' }]),
      isFeatured: true,
      order: 6,
    },
    {
      title: 'Digital Advertising',
      slug: 'digital-advertising',
      icon: 'Target',
      category: 'Advertising',
      shortDesc: 'High-impact display ads, Youtube video ads, and retargeting campaigns.',
      description: 'Engage customers everywhere they browse on the web with targeted banner, native, and video ads.',
      features: JSON.stringify(['Programmatic Display Ads', 'YouTube In-Stream Video Ads', 'Retargeting Pixel Setup', 'Ad Creative A/B Testing']),
      benefits: JSON.stringify(['Maximum brand visibility across high-traffic news and media sites', 'Capture warm prospects who visited your site']),
      deliverables: JSON.stringify(['Custom Banner Graphic Suites', 'Video Ad Assets', 'Live Campaign Dashboard Access']),
      process: JSON.stringify(['Audience Research', 'Ad Copy & Banner Design', 'Campaign Deployment', 'Optimization']),
      faqs: JSON.stringify([{ q: 'Can we target specific geographical locations?', a: 'Yes, we can target down to specific cities, neighborhoods, or countries.' }]),
      isFeatured: false,
      order: 7,
    },
  ]

  for (const s of servicesData) {
    await prisma.service.create({ data: s })
  }
  console.log('✅ Services created')

  // 3. Portfolio Projects
  const portfolioData = [
    {
      title: 'Safari Trails East Africa Platform',
      slug: 'safari-trails-east-africa',
      clientName: 'Safari Trails EA',
      industry: 'Tourism & Hospitality',
      description: 'Complete digital transformation featuring a high-converting web booking engine, luxury brand overhaul, and targeted Meta ads strategy targeting luxury travelers.',
      challenge: 'Outdated legacy website with slow loading speed on mobile devices resulting in dropped bookings and weak international social presence.',
      strategy: 'Engineered a Next.js booking platform with interactive safari package builders, coupled with cinematic drone video reels on Instagram & TikTok.',
      execution: 'Deployed custom booking UX, integrated M-Pesa & Stripe payments, launched targeted Google Search ads for international travel queries.',
      servicesProvided: JSON.stringify(['Website Development', 'Social Media Management', 'Branding', 'Digital Advertising']),
      technologies: JSON.stringify(['Next.js', 'Tailwind CSS', 'M-Pesa API', 'Stripe', 'Meta Ads']),
      projectDate: '2024 - Present',
      featuredImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=800'
      ]),
      results: JSON.stringify({
        'Lead Increase': '+280%',
        'Conversion Rate': '4.8%',
        'Social Followers': '45K+',
        'ROAS': '6.4x'
      }),
      testimonialText: '363 Creators completely turned around our digital presence. Our international safari bookings doubled within 4 months!',
      url: 'https://safaritrails.co.ke',
      isFeatured: true,
      order: 1,
    },
    {
      title: 'Savannah Bistro Culinary Brand & Social',
      slug: 'savannah-bistro-nairobi',
      clientName: 'Savannah Bistro',
      industry: 'Food & Beverage',
      description: 'A viral food marketing campaign and sleek website reservation system that turned a Westlands dining location into one of Nairobi’s trending spots.',
      challenge: 'Needed consistent foot traffic on weekday evenings and wanted to build a strong Instagram community.',
      strategy: 'Crafted high-quality reel content highlighting chef specials, influencer partnerships, and automated WhatsApp table reservation links.',
      execution: 'Weekly video shoots, targeted Instagram geotargeted ads, vibrant menu graphic design.',
      servicesProvided: JSON.stringify(['Content Creation', 'Social Media Management', 'SEO', 'Website Development']),
      technologies: JSON.stringify(['Instagram Reels', 'TikTok Ads', 'React', 'WhatsApp API']),
      projectDate: '2024',
      featuredImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800'
      ]),
      results: JSON.stringify({
        'Table Reservations': '+190%',
        'Instagram Reach': '1.2M',
        'Google Rank': '#1 for Bistro Westlands'
      }),
      testimonialText: 'The video content 363 Creators creates for us is phenomenal. Our weekend tables are booked solid 2 weeks in advance!',
      url: 'https://savannahbistro.com',
      isFeatured: true,
      order: 2,
    },
    {
      title: 'Nexus Heights Luxury Real Estate',
      slug: 'nexus-heights-properties',
      clientName: 'Nexus Heights',
      industry: 'Real Estate',
      description: 'Corporate branding, 3D property tour web portal, and lead generation ad campaigns for premium apartment developments in Kilimani.',
      challenge: 'High competition in Nairobi property market required reaching high-net-worth buyers and diaspora investors.',
      strategy: 'Engineered an interactive apartment unit filter web application combined with targeted LinkedIn & Meta lead generation forms.',
      execution: 'Designed brand identity suite, built custom web catalog, managed KSh 150K monthly Meta ad budget.',
      servicesProvided: JSON.stringify(['Branding', 'Website Development', 'Digital Advertising', 'Content Creation']),
      technologies: JSON.stringify(['Next.js', 'ThreeJS Virtual Tours', 'Meta Lead Ads', 'Google Ads']),
      projectDate: '2023 - 2024',
      featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
      ]),
      results: JSON.stringify({
        'Qualified Property Leads': '340+',
        'Units Sold Out': '85%',
        'Average CPL': 'KSh 420'
      }),
      testimonialText: 'Professionalism at its peak. 363 Creators delivered high-value diaspora leads that resulted in major property sales.',
      url: 'https://nexusrealestate.co.ke',
      isFeatured: true,
      order: 3,
    },
    {
      title: 'Kikwetu E-Commerce Fashion Store',
      slug: 'kikwetu-apparel',
      clientName: 'Kikwetu Apparel',
      industry: 'E-Commerce',
      description: 'End-to-end e-commerce store with automated M-Pesa express checkout, retargeting funnel, and influencer content kit.',
      challenge: 'Manual order processing via Instagram DMs led to lost sales and delayed customer fulfillment.',
      strategy: 'Built a sleek Next.js store with instant M-Pesa payment prompt and automated inventory sync.',
      execution: 'Shopify-to-Custom Next.js migration, Meta Pixel setup, SMS delivery notifications.',
      servicesProvided: JSON.stringify(['Website Development', 'Digital Marketing', 'SEO']),
      technologies: JSON.stringify(['Next.js', 'M-Pesa STK Push', 'Tailwind', 'Resend Email']),
      projectDate: '2024',
      featuredImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000',
      gallery: JSON.stringify(['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800']),
      results: JSON.stringify({
        'Monthly Sales': 'KSh 2.4M+',
        'Cart Abandonment Drop': '-45%',
        'Organic Traffic': '+310%'
      }),
      testimonialText: 'The automated M-Pesa checkout transformed our business overnight. Orders flow seamlessly without manual messages.',
      url: 'https://kikwetustore.co.ke',
      isFeatured: false,
      order: 4,
    },
    {
      title: 'Apex Law Chambers Corporate Rebrand',
      slug: 'apex-law-chambers',
      clientName: 'Apex Law',
      industry: 'Legal & Professional Services',
      description: 'Premium brand guidelines, bilingual corporate website, and executive LinkedIn positioning.',
      challenge: 'Outdated visual identity that failed to reflect the firm’s stature in corporate dispute resolution.',
      strategy: 'Designed an authoritative obsidian-and-gold brand palette, published thought-leadership articles, and optimized corporate SEO.',
      execution: 'Brand guideline publication, Next.js corporate portal, LinkedIn content series.',
      servicesProvided: JSON.stringify(['Branding', 'Website Development', 'SEO']),
      technologies: JSON.stringify(['React', 'Tailwind', 'Schema.org SEO']),
      projectDate: '2024',
      featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
      gallery: JSON.stringify(['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800']),
      results: JSON.stringify({
        'Corporate Consultations': '+140%',
        'Search Visibility': 'Page 1 on Google'
      }),
      testimonialText: '363 Creators gave our legal firm an international, world-class image.',
      url: 'https://apexlaw.co.ke',
      isFeatured: false,
      order: 5,
    },
  ]

  for (const p of portfolioData) {
    await prisma.portfolioProject.create({ data: p })
  }
  console.log('✅ Portfolio Projects created')

  // 4. Pricing Plans
  const plansData = [
    {
      name: 'STARTER',
      description: 'Ideal for small businesses & startups looking to establish a strong, professional digital presence.',
      price: 'KSh 35,000',
      billingFrequency: 'monthly',
      features: JSON.stringify([
        '12 Custom Social Media Posts / Month',
        '2 Short-Form Reels / TikTok Videos',
        'Management on 2 Platforms (IG & FB)',
        'Monthly Content Calendar & Approval',
        'Basic SEO & Google My Business Setup',
        'Monthly Analytics Performance Summary',
        'WhatsApp & Email Support'
      ]),
      isPopular: false,
      badge: 'Startups & SMEs',
      ctaText: 'Choose Starter',
      order: 1,
    },
    {
      name: 'GROWTH',
      description: 'Designed for scaling businesses that need aggressive lead generation, web development, and multi-channel marketing.',
      price: 'KSh 75,000',
      billingFrequency: 'monthly',
      features: JSON.stringify([
        '20 Custom Social Media Posts / Month',
        '6 Short-Form Reels / TikTok Videos',
        'Management on 4 Platforms (IG, FB, TikTok, LinkedIn)',
        'Full Website Design / Maintenance Included',
        'Paid Ad Campaign Management (Meta & Google)',
        'Weekly Community Management & DM Responses',
        'Dedicated Account Manager & 363 Portal Access',
        'Bi-weekly Strategic Growth Calls'
      ]),
      isPopular: true,
      badge: 'Most Popular',
      ctaText: 'Choose Growth',
      order: 2,
    },
    {
      name: 'ENTERPRISE',
      description: 'Full-service digital agency partnership for corporate organizations, real estate, and high-growth brands.',
      price: 'KSh 150,000',
      billingFrequency: 'monthly',
      features: JSON.stringify([
        'Unlimited Social Media Content Production',
        '12+ Commercial Studio/On-site Video Reels',
        'Multi-Platform Management + YouTube & X',
        'Custom Web App / E-Commerce Development & Hosting',
        'Advanced Meta, Google & TikTok Ad Funnels',
        'Commercial Brand Photography & Drone Footage',
        'Custom Analytics & Quarterly ROI Presentation',
        'Priority 24/7 VIP Support Team'
      ]),
      isPopular: false,
      badge: 'Custom Corporate',
      ctaText: 'Choose Enterprise',
      order: 3,
    },
  ]

  for (const plan of plansData) {
    await prisma.pricingPlan.create({ data: plan })
  }
  console.log('✅ Pricing Plans created')

  // 5. Testimonials
  const testimonialsData = [
    {
      clientName: 'David Kimani',
      company: 'Safari Trails East Africa',
      position: 'Managing Director',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      content: 'Working with 363 Creators has transformed how international tourists discover our safari tours. Their content approval dashboard makes reviewing videos effortless, and our revenue is up by 280%!',
      serviceCategory: 'Website & Digital Marketing',
      rating: 5,
      isPublished: true,
      order: 1,
    },
    {
      clientName: 'Amina Mohamed',
      company: 'Savannah Bistro Nairobi',
      position: 'Co-Founder & Creative Lead',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      content: 'The team at 363 Creators understands storytelling and viral content better than anyone in Nairobi. Our restaurant tables are consistently booked thanks to their targeted reels and social strategy.',
      serviceCategory: 'Social Media Management',
      rating: 5,
      isPublished: true,
      order: 2,
    },
    {
      clientName: 'Brian Omondi',
      company: 'Nexus Heights Properties',
      position: 'Head of Sales',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      content: 'The quality of leads coming from 363 Creators’ ad campaigns is exceptional. They don’t just deliver clicks; they deliver real buyers interested in our Kilimani apartments.',
      serviceCategory: 'Digital Advertising',
      rating: 5,
      isPublished: true,
      order: 3,
    },
    {
      clientName: 'Sarah Jenkins',
      company: 'Kikwetu Apparel',
      position: 'Founder',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      content: 'Our new Next.js online store with integrated M-Pesa payments works flawlessly. 363 Creators executed the project on time and within budget.',
      serviceCategory: 'E-Commerce Website',
      rating: 5,
      isPublished: true,
      order: 4,
    },
    {
      clientName: 'Charles Oduor',
      company: 'Apex Law Chambers',
      position: 'Managing Partner',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      content: 'An outstanding digital agency partner. They handled our corporate rebrand and website build with high precision and professionalism.',
      serviceCategory: 'Branding & Web',
      rating: 5,
      isPublished: true,
      order: 5,
    },
  ]

  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: t })
  }
  console.log('✅ Testimonials created')

  // 6. Blog Posts
  const blogData = [
    {
      title: 'How East African Businesses Can Drive 10x ROI with Short-Form Video in 2025',
      slug: 'how-east-african-businesses-can-drive-roi-with-short-form-video',
      author: '363 Strategy Team',
      featuredImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1000',
      excerpt: 'Short-form video on TikTok and Instagram Reels is no longer optional for brands in Kenya. Discover the exact 5-step video funnel that converts casual viewers into loyal buyers.',
      category: 'Social Media',
      tags: JSON.stringify(['TikTok', 'Instagram Reels', 'Video Marketing', 'Kenya Business']),
      content: `
# How East African Businesses Can Drive 10x ROI with Short-Form Video in 2025

Social media consumption in Kenya, Uganda, and Tanzania has shifted dramatically toward vertical video content. Platforms like **TikTok** and **Instagram Reels** prioritize algorithmically driven discovery over traditional follower counts.

## 1. The Hook Strategy (First 3 Seconds)
Your audience makes a split-second decision whether to keep watching or scroll past. Start with visual movement or a compelling statement rather than a generic introduction.

## 2. Educational & Problem-Solving Content
Demonstrate how your product solves a specific pain point. Show behind-the-scenes processes, customer testimonials, and direct demonstrations.

## 3. Clear Call-To-Action (CTA)
Never leave your viewer guessing. Direct them to tap the link in your bio, send a WhatsApp message, or visit your website.

## 4. Consistent Batch Production
Top performing brands don't post once a month. Work with a dedicated digital agency like **363 Creators** to batch shoot and schedule 15-20 high-quality reels monthly.
      `,
      seoTitle: 'Short-Form Video Marketing Strategy for Kenyan Brands | 363 Creators',
      seoDescription: 'Learn how to leverage TikTok and Instagram Reels to scale your business in East Africa.',
      isPublished: true,
    },
    {
      title: 'Why Next.js Outperforms WordPress for Modern Company Websites',
      slug: 'why-nextjs-outperforms-wordpress-for-modern-websites',
      author: 'Tech Engineering Lead',
      featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
      excerpt: 'Speed, security, and mobile responsiveness dictate modern search engine rankings. Here is why custom Next.js web applications outpace traditional WordPress sites.',
      category: 'Web Development',
      tags: JSON.stringify(['Next.js', 'React', 'Web Development', 'SEO']),
      content: `
# Why Next.js Outperforms WordPress for Modern Company Websites

When building a digital presence for a serious enterprise, choosing the right web architecture is critical.

## 1. Sub-Second Speed & Core Web Vitals
Next.js leverages Server-Side Rendering (SSR) and Static Site Generation (SSG) to serve pre-rendered HTML to visitors instantly.

## 2. Bank-Grade Security
Unlike WordPress sites that suffer from vulnerable third-party plugins, Next.js applications run on modern JavaScript runtimes without exposing vulnerable database query endpoints.

## 3. Native M-Pesa & Payment API Integration
Custom React/Next.js builds allow seamless integration with payment gateways like M-Pesa STK Push and Stripe without relying on heavy third-party plugins.
      `,
      seoTitle: 'Next.js vs WordPress for Business Websites | 363 Creators',
      seoDescription: 'Discover the speed, security, and conversion benefits of custom Next.js website development.',
      isPublished: true,
    },
    {
      title: 'Mastering Local SEO in Nairobi: How to Rank #1 on Google',
      slug: 'mastering-local-seo-nairobi-google-rankings',
      author: 'SEO Specialist',
      featuredImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1000',
      excerpt: 'Local search queries like "best restaurant in Westlands" or "real estate in Kilimani" drive high-intent customers. Master local SEO with this actionable playbook.',
      category: 'SEO',
      tags: JSON.stringify(['SEO', 'Google Maps', 'Local Marketing', 'Nairobi']),
      content: `
# Mastering Local SEO in Nairobi

Local search volume in Kenya has grown exponentially over the past 3 years.

## Key Steps:
1. Optimize Google Business Profile (NAP consistency).
2. Gather genuine 5-star customer reviews.
3. Build location-specific landing pages.
4. Implement schema markup for structured local data.
      `,
      seoTitle: 'Local SEO Guide Nairobi Kenya | 363 Creators',
      seoDescription: 'Rank #1 on Google for local searches in Nairobi and East Africa.',
      isPublished: true,
    },
    {
      title: 'The Blueprint for Building a High-Converting Brand Identity',
      slug: 'blueprint-for-building-high-converting-brand-identity',
      author: 'Brand Design Lead',
      featuredImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=1000',
      excerpt: 'Branding is more than just a logo. Discover how color psychology, typography, and brand positioning elevate your market authority.',
      category: 'Branding',
      tags: JSON.stringify(['Branding', 'Graphic Design', 'Visual Identity']),
      content: `
# The Blueprint for Building a High-Converting Brand Identity

Your visual brand communicates quality before a customer ever reads your pitch.
      `,
      seoTitle: 'Brand Identity Design Guide | 363 Creators',
      seoDescription: 'Build a premium brand identity that commands high pricing.',
      isPublished: true,
    },
    {
      title: 'Meta Ads vs Google Ads: Which is Right for Your East African Business?',
      slug: 'meta-ads-vs-google-ads-east-africa',
      author: 'Performance Marketer',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
      excerpt: 'Should you invest in Facebook/Instagram ads or Google Search ads? We break down targeting, costs, and conversion metrics.',
      category: 'Marketing',
      tags: JSON.stringify(['Meta Ads', 'Google Ads', 'PPC', 'Digital Marketing']),
      content: `
# Meta Ads vs Google Ads: Which is Right for Your Business?

Understanding search intent vs visual impulse discovery is key to choosing your primary ad channel.
      `,
      seoTitle: 'Meta Ads vs Google Ads in Kenya | 363 Creators',
      seoDescription: 'Compare advertising channels for optimal ROI in East Africa.',
      isPublished: true,
    },
  ]

  for (const b of blogData) {
    await prisma.blogPost.create({ data: b })
  }
  console.log('✅ Blog Posts created')

  // 7. Leads & Quotes
  const leadsData = [
    {
      referenceNo: 'LEAD-901',
      name: 'Michael Njuguna',
      company: 'Great Rift Logistics',
      email: 'mnjuguna@riftlogistics.com',
      phone: '+254 711 998877',
      serviceRequested: 'Website Design & Development',
      budgetRange: 'KSh 100,000+',
      projectDetails: 'We need a modern corporate website with real-time shipment tracking and customer portal.',
      source: 'Google Search',
      status: 'NEW',
    },
    {
      referenceNo: 'LEAD-902',
      name: 'Grace Mutua',
      company: 'Zenith Health Spa',
      email: 'grace@zenithspa.co.ke',
      phone: '+254 722 445566',
      serviceRequested: 'Social Media Management',
      budgetRange: 'KSh 50,000–100,000',
      projectDetails: 'Looking for full social media takeover, monthly reel video shoots, and Instagram booking management.',
      source: 'Instagram',
      status: 'QUALIFIED',
    },
    {
      referenceNo: 'LEAD-903',
      name: 'Kevin Vance',
      company: 'Vance Tech Solutions',
      email: 'kvance@vancetech.com',
      phone: '+254 733 887766',
      serviceRequested: 'Digital Marketing & Ads',
      budgetRange: 'KSh 100,000+',
      projectDetails: 'Need B2B lead generation campaigns on LinkedIn and Google Ads targeting IT directors in Nairobi.',
      source: 'Referral',
      status: 'PROPOSAL_SENT',
    },
    {
      referenceNo: 'LEAD-904',
      name: 'Catherine Wambui',
      company: 'Urban Threads Boutique',
      email: 'cate@urbanthreads.co.ke',
      phone: '+254 700 123123',
      serviceRequested: 'Branding & Creative Design',
      budgetRange: 'KSh 20,000–50,000',
      projectDetails: 'Complete rebrand package including logo, social media templates, and store signage vectors.',
      source: 'Website Form',
      status: 'CONTACTED',
    },
    {
      referenceNo: 'LEAD-905',
      name: 'Emmanuel Kiprop',
      company: 'Rift Valley Organic Farm',
      email: 'emmanuel@riftvalleyorganic.co.ke',
      phone: '+254 744 556677',
      serviceRequested: 'E-Commerce Website & SEO',
      budgetRange: 'KSh 50,000–100,000',
      projectDetails: 'Online store for organic produce delivery in Nairobi with M-Pesa automated checkout.',
      source: 'Website Form',
      status: 'WON',
    },
  ]

  for (const l of leadsData) {
    await prisma.lead.create({ data: l })
  }

  await prisma.quote.create({
    data: {
      referenceNo: '363-8821',
      businessName: 'Great Rift Logistics',
      contactName: 'Michael Njuguna',
      email: 'mnjuguna@riftlogistics.com',
      phone: '+254 711 998877',
      whatsapp: '+254 711 998877',
      services: JSON.stringify(['Website Development', 'SEO', 'Digital Marketing']),
      projectDetails: 'Full corporate web portal build and regional SEO campaign.',
      budgetRange: 'KSh 100,000+',
      timeline: '1 Month',
      extraInfo: 'We want to launch before Q4.',
      status: 'PENDING',
    },
  })
  console.log('✅ Leads & Quotes created')

  // 8. Consultations
  await prisma.consultation.create({
    data: {
      service: 'Website Design & Development',
      date: '2026-10-05',
      timeSlot: '10:00 AM - 11:00 AM',
      name: 'Michael Njuguna',
      email: 'mnjuguna@riftlogistics.com',
      phone: '+254 711 998877',
      businessName: 'Great Rift Logistics',
      message: 'Discussing scope and timeline for logistics website.',
      status: 'APPROVED',
    },
  })
  await prisma.consultation.create({
    data: {
      service: 'Social Media Management',
      date: '2026-10-06',
      timeSlot: '02:00 PM - 03:00 PM',
      name: 'Grace Mutua',
      email: 'grace@zenithspa.co.ke',
      phone: '+254 722 445566',
      businessName: 'Zenith Health Spa',
      message: 'Planning social media reels shoot for October.',
      status: 'PENDING',
    },
  })
  console.log('✅ Consultations created')

  // 9. Projects & Milestones
  const project1 = await prisma.project.create({
    data: {
      clientProfileId: client1User.clientProfile!.id,
      name: 'Safari Trails Q4 Growth Campaign & Web Optimization',
      serviceType: 'Growth Retainer',
      description: 'Ongoing social media management, video reels production, and website booking funnel optimization.',
      status: 'IN_PROGRESS',
      progress: 65,
      startDate: new Date('2024-09-01'),
      deadline: new Date('2024-12-31'),
      budget: 220000,
      assignedTeam: JSON.stringify(['Alex Creator', 'Sarah Lead', 'David Developer']),
      milestones: {
        create: [
          { name: 'October Content Calendar & Shoot', dueDate: new Date('2024-10-01'), status: 'COMPLETED', order: 1 },
          { name: 'Website Speed & Booking UX Upgrade', dueDate: new Date('2024-10-15'), status: 'IN_PROGRESS', order: 2 },
          { name: 'Q4 Meta Ad Campaign Launch', dueDate: new Date('2024-11-01'), status: 'PENDING', order: 3 },
        ],
      },
    },
  })

  const project2 = await prisma.project.create({
    data: {
      clientProfileId: client2User.clientProfile!.id,
      name: 'Savannah Bistro Menu Relaunch & Reel Series',
      serviceType: 'Social Media & Video',
      description: 'Creation of 16 high-definition video reels and community engagement campaign for new culinary offerings.',
      status: 'IN_PROGRESS',
      progress: 80,
      startDate: new Date('2024-09-10'),
      deadline: new Date('2024-10-30'),
      budget: 95000,
      assignedTeam: JSON.stringify(['Alex Creator', 'Joy Video']),
      milestones: {
        create: [
          { name: 'On-site Food Shoot', dueDate: new Date('2024-09-15'), status: 'COMPLETED', order: 1 },
          { name: 'Batch Reel Editing & Color Grading', dueDate: new Date('2024-09-25'), status: 'COMPLETED', order: 2 },
          { name: 'Client Post Approval & Scheduling', dueDate: new Date('2024-10-05'), status: 'IN_PROGRESS', order: 3 },
        ],
      },
    },
  })

  const project3 = await prisma.project.create({
    data: {
      clientProfileId: client3User.clientProfile!.id,
      name: 'Nexus Heights Property Launch & Lead Ads',
      serviceType: 'Digital Advertising',
      description: 'Lead generation ad funnels on Meta & LinkedIn for new Kilimani apartment development.',
      status: 'REVIEW',
      progress: 90,
      startDate: new Date('2024-08-15'),
      deadline: new Date('2024-10-15'),
      budget: 180000,
      assignedTeam: JSON.stringify(['Sarah Lead', 'Mark Ads']),
      milestones: {
        create: [
          { name: 'Ad Creative Design & Landing Page', dueDate: new Date('2024-08-30'), status: 'COMPLETED', order: 1 },
          { name: 'Campaign Launch & Optimization', dueDate: new Date('2024-09-15'), status: 'COMPLETED', order: 2 },
          { name: 'Lead Export & Final Report', dueDate: new Date('2024-10-10'), status: 'IN_PROGRESS', order: 3 },
        ],
      },
    },
  })

  console.log('✅ Projects & Milestones created')

  // 10. Social Posts & Approval Examples
  const post1 = await prisma.socialPost.create({
    data: {
      projectId: project1.id,
      title: 'Masai Mara Great Migration Sunset Reel',
      platform: 'INSTAGRAM',
      contentType: 'Reel / Video',
      mediaUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
      caption: 'Experience the world’s greatest wildlife spectacle in luxury. 🦁✨ Reserve your October Masai Mara luxury safari today with Safari Trails East Africa.\n\nDirect booking link in bio or WhatsApp +254 712 345678.',
      hashtags: '#MagicalKenya #MasaiMara #SafariTrails #LuxuryTravel #VisitKenya #AfricaSafari',
      scheduledDate: new Date('2024-10-05T18:00:00Z'),
      status: 'PENDING_APPROVAL',
    },
  })

  const post2 = await prisma.socialPost.create({
    data: {
      projectId: project1.id,
      title: 'Exclusive Diani Beach Villa Showcase',
      platform: 'FACEBOOK',
      contentType: 'Carousel',
      mediaUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
      caption: 'Escape to the pristine white sands of Diani Beach. Enjoy private chef services, oceanfront infinity pool, and customized coastal tours.',
      hashtags: '#DianiBeach #KenyaCoast #BeachResort #SafariTrails',
      scheduledDate: new Date('2024-10-08T10:00:00Z'),
      status: 'APPROVED',
    },
  })

  const post3 = await prisma.socialPost.create({
    data: {
      projectId: project2.id,
      title: 'Chef Special Steak Night Promo',
      platform: 'TIKTOK',
      contentType: 'Reel / Video',
      mediaUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
      caption: 'Juicy 400g T-Bone Steak served with Truffle Fries! 🔥 Join us every Thursday night at Savannah Bistro Westlands.',
      hashtags: '#NairobiEats #SavannahBistro #Westlands #SteakNight #KenyaTikTok',
      scheduledDate: new Date('2024-10-10T12:00:00Z'),
      status: 'REVISION_REQUESTED',
      clientFeedback: 'Can we change the background music to a lighter afro-jazz track and update the price in text overlay?',
    },
  })

  await prisma.contentApproval.create({
    data: {
      socialPostId: post2.id,
      clientProfileId: client1User.clientProfile!.id,
      status: 'APPROVED',
      feedback: 'Approved! Great visuals.',
    },
  })

  console.log('✅ Social Posts & Content Approvals created')

  // 11. Invoices & Payments
  const invoice1 = await prisma.invoice.create({
    data: {
      clientProfileId: client1User.clientProfile!.id,
      invoiceNumber: 'INV-363-2024-001',
      issueDate: new Date('2024-09-01'),
      dueDate: new Date('2024-09-15'),
      subtotal: 75000,
      tax: 12000,
      total: 87000,
      amountPaid: 87000,
      balance: 0,
      status: 'PAID',
      items: JSON.stringify([
        { description: 'Growth Package Monthly Retainer (September)', qty: 1, unitPrice: 75000, total: 75000 },
      ]),
      notes: 'Thank you for your partnership.',
      payments: {
        create: [
          {
            amount: 87000,
            paymentMethod: 'MPESA',
            referenceNo: 'RKH982312A',
            mpesaPhone: '254712345678',
            status: 'COMPLETED',
          },
        ],
      },
    },
  })

  const invoice2 = await prisma.invoice.create({
    data: {
      clientProfileId: client1User.clientProfile!.id,
      invoiceNumber: 'INV-363-2024-004',
      issueDate: new Date('2024-10-01'),
      dueDate: new Date('2024-10-15'),
      subtotal: 75000,
      tax: 12000,
      total: 87000,
      amountPaid: 0,
      balance: 87000,
      status: 'SENT',
      items: JSON.stringify([
        { description: 'Growth Package Monthly Retainer (October)', qty: 1, unitPrice: 75000, total: 75000 },
      ]),
      notes: 'Payable via M-Pesa or Bank Transfer.',
    },
  })

  const invoice3 = await prisma.invoice.create({
    data: {
      clientProfileId: client2User.clientProfile!.id,
      invoiceNumber: 'INV-363-2024-002',
      issueDate: new Date('2024-09-10'),
      dueDate: new Date('2024-09-24'),
      subtotal: 50000,
      tax: 8000,
      total: 58000,
      amountPaid: 58000,
      balance: 0,
      status: 'PAID',
      items: JSON.stringify([
        { description: 'Savannah Bistro Reel Shoot & Content Editing', qty: 1, unitPrice: 50000, total: 50000 },
      ]),
      notes: 'Paid via Card.',
      payments: {
        create: [
          {
            amount: 58000,
            paymentMethod: 'CARD',
            referenceNo: 'CARD-TXN-99821',
            status: 'COMPLETED',
          },
        ],
      },
    },
  })

  console.log('✅ Invoices & Payments created')

  // 12. Reports
  await prisma.report.create({
    data: {
      clientProfileId: client1User.clientProfile!.id,
      projectId: project1.id,
      title: 'September 2024 Social & Traffic Performance Report',
      reportType: 'SOCIAL',
      metrics: JSON.stringify({
        followers: '45,200 (+3,400)',
        impressions: '380,000',
        reach: '210,000',
        engagementRate: '5.8%',
        websiteClicks: '4,120',
        conversions: '42 Bookings',
      }),
      period: 'September 2024',
    },
  })

  // 13. Messages
  await prisma.message.create({
    data: {
      projectId: project1.id,
      senderId: adminUser.id,
      senderRole: 'SUPER_ADMIN',
      content: 'Hi David! The October content calendar draft is ready in your portal for review.',
    },
  })

  await prisma.message.create({
    data: {
      projectId: project1.id,
      senderId: client1User.id,
      senderRole: 'CLIENT',
      content: 'Thanks team! Reviewing the Masai Mara reel right now.',
    },
  })

  // 14. Site Settings
  const settingsData = [
    { key: 'company_name', value: '363 Creators' },
    { key: 'company_tagline', value: 'We Create. We Manage. We Grow.' },
    { key: 'company_email', value: 'wesleyclark10203@gmail.com' },
    { key: 'company_phone', value: '+254 790 671626' },
    { key: 'whatsapp_number', value: '254790671626' },
    { key: 'location_address', value: 'Nairobi, Kenya' },
    { key: 'social_instagram', value: 'https://www.instagram.com/363creators/?utm_source=ig_web_button_share_sheet' },
    { key: 'social_facebook', value: 'https://www.facebook.com/363creators.ke' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/363creators' },
    { key: 'social_tiktok', value: 'https://tiktok.com/@363creators' },
    { key: 'social_x', value: 'https://x.com/363creators' },
    { key: 'hero_title', value: 'We Create. We Manage. We Grow.' },
    { key: 'hero_subtitle', value: '363 Creators helps businesses build powerful digital brands through social media management, websites, content and digital marketing.' },
  ]

  for (const set of settingsData) {
    await prisma.siteSetting.create({ data: set })
  }

  console.log('✅ Site Settings created')
  console.log('🎉 Seeding complete successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
