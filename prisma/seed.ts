import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting clean database seed...')

  // Clear all existing data
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

  // 1. Create Super Admin User
  await prisma.user.create({
    data: {
      email: 'wesleyclark10203@gmail.com',
      passwordHash,
      name: 'Wesley Clark',
      role: 'SUPER_ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    },
  })

  console.log('✅ Super Admin created (wesleyclark10203@gmail.com)')

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

  // 3. Portfolio Projects Showcase
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
      `,
      seoTitle: 'Next.js vs WordPress for Business Websites | 363 Creators',
      seoDescription: 'Discover the speed, security, and conversion benefits of custom Next.js website development.',
      isPublished: true,
    },
  ]

  for (const b of blogData) {
    await prisma.blogPost.create({ data: b })
  }
  console.log('✅ Blog Posts created')

  // 7. Site Settings
  const settingsData = [
    { key: 'company_name', value: '363 Creators' },
    { key: 'company_tagline', value: 'We Create. We Manage. We Grow.' },
    { key: 'company_email', value: 'wesleyclark10203@gmail.com, andalamorgan@gmail.com' },
    { key: 'company_phone', value: '+254 790 671626, +254 707 311381' },
    { key: 'whatsapp_number', value: '254707311381' },
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
  console.log('🎉 Clean seed completed! All Admin portal data is now empty and ready for fresh entries.')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
