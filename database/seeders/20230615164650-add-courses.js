"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Courses", [
      {
        id: "729a1017-f38a-4cf8-abc1-e5642099c500",
        title: "Introduction to Programming",
        description:
          "There is an overwhelming number of options that are available to those who want to learn. Introduction to Programming is designed to give you the foundational skills that will prove important for any type of programming you want to do. You’ll learn to code web pages, create a mobile application and use external data sources. (Mobile covered in Level II of the course) This course, which includes video lectures, lab exercises, and full program code will prepare you for entry-level jobs in development— or simply make you comfortable with code and confident in more advanced study. As you build a portfolio of skills, you’ll also build a portfolio of completed projects that can be used to demonstrate your new skill sets. In Level I of the course, we focus on foundations-- The things that all developers need to know to be successful. With each passing chapter of the course, you'll learn new skills and demonstrate them in a lab exercise.",
        price: 49.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "293a212f-4bac-4c05-9895-c94d3e2e88a3",
        title: "Advanced Web Development",
        description:
          "Are you ready to take your web development skills to the next level? In this comprehensive course, you'll delve deep into advanced web development techniques and tools. From frontend frameworks like React and Angular to backend technologies like Node.js and Express, you'll gain a solid understanding of the full web development stack. You'll also learn about databases, API integration, and deployment strategies. By the end of this course, you'll have the expertise to build dynamic and scalable web applications that meet the demands of modern users.",
        price: 99.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Advanced",
        estimatedCompletionTime: "5 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "85ebf490-8010-4e6a-b681-c703b1af0c51",
        title: "Machine Learning Fundamentals",
        description:
          "Unlock the power of machine learning with this foundational course. Dive into the world of algorithms, data preprocessing, model evaluation, and more. You'll learn how to train machine learning models to make predictions and solve real-world problems. Through hands-on exercises and projects, you'll gain practical experience in implementing machine learning techniques using popular libraries such as TensorFlow and scikit-learn. Whether you're a data scientist or a developer looking to incorporate machine learning into your applications, this course is your gateway to the exciting field of AI.",
        price: 129.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Intermediate",
        estimatedCompletionTime: "3 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "d499dfca-032e-4a63-b6c2-341a14cbf4e5",
        title: "iOS App Development: From Beginner to Pro",
        description:
          "Ever wanted to create your own iPhone or iPad app? Look no further! In this comprehensive course, you'll learn everything you need to know to become an iOS app development expert. Starting with the basics of Swift programming language, you'll gradually build your skills and develop interactive and engaging iOS applications. From user interface design to integrating APIs and leveraging device features, you'll master the art of iOS app development. Join us on this exciting journey and unleash your creativity in the world of iOS development.",
        price: 79.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Intermediate",
        estimatedCompletionTime: "7 days",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-4.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a505cf78-593e-4511-83ec-e09dc01c682e",
        title: "Digital Marketing Mastery",
        description:
          "Discover the secrets of digital marketing success in this comprehensive course. Learn how to create effective marketing strategies, optimize online campaigns, and leverage social media platforms to reach your target audience. From search engine optimization (SEO) to content marketing and email marketing, you'll gain the skills needed to thrive in the digital landscape. Join us and become a digital marketing expert, driving growth and achieving measurable results for businesses.",
        price: 79.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Intermediate",
        estimatedCompletionTime: "5 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-5.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "68f5a86f-65ea-4816-a70e-aa39cd9e948f",
        title: "Photography Masterclass",
        description:
          "Unleash your creativity and capture stunning photographs with confidence. This masterclass is designed for beginners and enthusiasts alike. Learn about camera settings, composition techniques, lighting principles, and post-processing workflows. From landscapes to portraits, you'll explore various genres of photography and develop your unique style. Join us on this visual journey and transform your passion for photography into a lifelong skill.",
        price: 99.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-6.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a54e3a7f-9132-48a2-acab-9030001f427c",
        title: "Investing and Stock Market Fundamentals",
        description:
          "Take control of your financial future with this comprehensive course on investing and stock market fundamentals. Learn how to analyze stocks, build a diversified portfolio, and make informed investment decisions. Understand key financial concepts, explore different investment strategies, and learn from real-world case studies. Whether you're a beginner or an experienced investor, this course will equip you with the knowledge and confidence to navigate the stock market with success.",
        price: 89.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Intermediate",
        estimatedCompletionTime: "6 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-7.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "abab54c7-8f2b-4748-934e-4f487fd60a66",
        title: "Creative Writing Workshop For Beginners",
        description:
          "Unlock your imagination and develop your writing skills with this immersive creative writing workshop. From crafting engaging stories to evoking emotions through poetry, you'll explore various forms of creative writing. Learn techniques for character development, plot structuring, dialogue writing, and descriptive language. Receive personalized feedback and guidance from experienced writers to refine your craft. Whether you aspire to be a novelist, a poet, or simply want to explore the art of writing, this workshop will ignite your creativity and help you unleash your storytelling potential.",
        price: 69.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "8 days",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-8.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9cbef3a6-e225-4fcc-82e5-e22896c80e14",
        title: "Cooking Essentials: From Basic Skills to Gourmet Dishes",
        description:
          "Embark on a culinary journey and master the art of cooking with this comprehensive course. Learn essential cooking techniques, explore flavor profiles, and create delicious dishes from scratch. From basic knife skills to advanced culinary concepts, you'll develop the foundation needed to prepare gourmet meals with confidence. Discover the secrets of professional chefs, experiment with flavors, and impress your family and friends with your culinary prowess.",
        price: 79.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "5 hours",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-9.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8002c2f6-438f-4044-96f9-abcf2bdf0258",
        title: "Graphic Design Fundamentals",
        description:
          "Unlock your creativity and learn the essentials of graphic design. Explore design principles, typography, color theory, and layout techniques. Master popular design software and create visually stunning graphics for print and digital media. From logos and brochures to social media graphics and website designs, this course will equip you with the skills needed to thrive in the world of graphic design.",
        price: 89.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Intermediate",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-10.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2442c5b4-5227-4287-a515-25a571a7b692",
        title: "Introduction to Psychology",
        description:
          "Embark on a fascinating journey into the human mind with this introductory psychology course. Explore key concepts, theories, and research methods in the field of psychology. Understand the workings of memory, cognition, perception, and emotions. Delve into social psychology, developmental psychology, and abnormal psychology. Gain insights into human behavior and discover how psychology influences various aspects of our lives.",
        price: 69.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "4 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-11.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e22e27ad-ecc2-426b-b76b-4d8adf36f0f8",
        title: "Beginner's Guide to Digital Marketing",
        description:
          "Enter the exciting world of digital marketing and learn how to create effective online marketing strategies. From search engine optimization (SEO) to social media marketing and email campaigns, explore various digital marketing channels. Gain insights into consumer behavior, understand analytics tools, and optimize marketing campaigns for maximum impact. Whether you're a business owner or aspiring marketer, this course will equip you with the skills to thrive in the digital landscape.",
        price: 79.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "10 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-12.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2c29e065-86ba-4232-bc8b-a43cb3388bb2",
        title: "Artificial Intelligence For Beginners",
        description:
          "Embark on a journey into the fascinating field of artificial intelligence (AI). Learn the basics of AI, machine learning, and neural networks. Understand how AI is transforming industries and revolutionizing technology. Explore applications of AI in various domains, from healthcare to finance and self-driving cars. Gain hands-on experience with AI tools and develop the skills needed to embark on a career in this rapidly evolving field.",
        price: 89.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-13.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f89e84c4-a7c7-4e81-a9b6-3727da9ed54d",
        title: "Photography For Beginners",
        description:
          "Unleash your creativity and capture stunning photographs with this comprehensive photography masterclass. Learn the fundamentals of photography, from camera settings and composition to lighting and post-processing techniques. Explore different genres of photography, including landscape, portrait, wildlife, and street photography. Develop your unique style, tell compelling visual stories, and showcase your photographic talent to the world.",
        price: 99.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "3 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-14.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4949c4ad-84c6-4862-becd-98c1d3705eeb",
        title: "Advanced Creative Writing",
        description:
          "Unleash your imagination and hone your writing skills with this creative writing workshop. Explore different genres, from fiction to poetry, and learn techniques to develop compelling characters, plots, and settings. Dive into the world of storytelling, narrative structure, and dialogue. Receive feedback from experienced writers and refine your craft. Whether you're an aspiring author or simply passionate about writing, this course will ignite your creativity and help you find your unique voice.",
        price: 69.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Advanced",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-15.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "282666bd-6d00-45c8-a2d5-7bca0544f05d",
        title: "Mobile App Development",
        description:
          "Immerse yourself in the dynamic world of mobile app development and learn how to build captivating and feature-rich applications for iOS and Android platforms. With this comprehensive course on mobile app development, you'll gain the skills and knowledge to create mobile apps that make a lasting impact. In today's digital landscape, mobile apps have become an essential part of our lives, offering endless possibilities and opportunities. Whether you're a beginner or an experienced developer, this course will equip you with the tools and techniques to master the art of mobile app development. Chapter 1: Introduction to Mobile App Development In this chapter, you'll dive into the fundamentals of mobile app development. Explore the different mobile platforms, including iOS and Android, and understand their unique characteristics and requirements. Gain insights into the app development process, from concept to deployment, and discover the key tools and technologies used by mobile app developers. By the end of this chapter, you'll have a solid understanding of the mobile app development landscape and be ready to embark on your app-building journey. Chapter 2: Swift Programming for iOS In this chapter, you'll focus on iOS app development using the Swift programming language. Swift is a powerful and intuitive language that enables developers to create cutting-edge and efficient iOS apps. Learn the basics of Swift, including variables, data types, control flow, and functions. Dive into the iOS development environment, including Xcode, and gain hands-on experience in building your first iOS app. By the end of this chapter, you'll have the foundation needed to develop engaging and user-friendly iOS apps. Chapter 3: Java Programming for Android In this chapter, you'll explore the world of Android app development using the Java programming language. Java is a versatile and widely adopted language that powers millions of Android apps. Master the fundamentals of Java programming, including object-oriented programming, data structures, and control statements. Dive into the Android development environment, including Android Studio, and build your first Android app from scratch. By the end of this chapter, you'll have the skills to create robust and interactive Android apps that cater to a wide range of users. Chapter 4: Building Real-World Mobile Apps In this final chapter, you'll apply your skills and knowledge to build real-world mobile applications. Learn how to design visually appealing and intuitive user interfaces that provide seamless user experiences. Dive into advanced topics such as integrating essential features like authentication and data storage into your apps. Explore the process of testing and debugging your apps to ensure their functionality and quality. Finally, gain insights into the app deployment process, including publishing your apps to the respective app stores. By the end of this chapter, you'll be equipped with the skills and confidence to develop and launch your own mobile apps to the world.  Whether you're a student, a professional looking to expand your skillset, or an entrepreneur with innovative ideas, this course is your gateway to the exciting world of mobile app development. Join us on this journey, and unlock the potential to create impactful and successful mobile applications.",
        price: 99.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Intermediate",
        estimatedCompletionTime: "6 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-16.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "46f5e899-f36d-4381-bf7e-25d7fadb84ef",
        title: "Introduction to Music Production",
        description:
          "Unleash your creativity and embark on a transformative journey into the world of music production. In this comprehensive course, you will dive deep into the art and science of creating captivating and professional-quality music. Whether you're a passionate musician, an aspiring producer, or simply interested in the fascinating realm of music production, this course will empower you to bring your musical ideas to life with confidence and skill. Chapter 1: Introduction to Music Production. In this opening chapter, you'll be introduced to the multifaceted world of music production. Delve into the crucial role of a music producer and gain insights into their responsibilities and creative decision-making processes. Understand the fundamentals of sound and audio, including key concepts such as frequency, amplitude, and timbre. Explore the various stages of music production, from pre-production to post-production, and gain a holistic understanding of the production workflow. Chapter 2: Recording and Editing Audio. In this chapter, you'll embark on an exciting exploration of audio recording and editing techniques. Learn how to set up your own home recording studio, including selecting the right equipment, optimizing acoustics, and setting up microphones. Dive into the art of capturing high-quality audio recordings, covering essential topics such as mic placement, recording techniques, and optimizing signal flow. Master the art of editing and manipulating audio using digital tools, enabling you to refine your recordings and create sonic landscapes that resonate with your artistic vision. Chapter 3: Music Theory and Composition. In this pivotal chapter, you'll unlock the secrets of music theory and composition, providing you with a solid foundation for creating harmonious and expressive musical arrangements. Explore the world of scales and chords, learning how to construct and utilize them effectively in your compositions. Discover the interplay of melody and harmony, allowing you to craft memorable and emotionally evocative musical themes. Gain a deep understanding of rhythm and its impact on musical arrangements, enabling you to create dynamic and engaging compositions that captivate listeners. Chapter 4: Mixing and Mastering. In this final chapter, you'll delve into the art and science of mixing and mastering, the essential processes that give your music its final polish and professional sheen. Learn how to balance audio levels, sculpt the sound using equalization techniques, and apply a wide range of effects to enhance the sonic characteristics of your tracks. Explore the intricacies of stereo imaging, spatialization, and panning to create immersive and captivating soundscapes. Finally, master the art of mastering, where you'll prepare your tracks for distribution and streaming platforms, ensuring they sound their best across various playback systems. Throughout the course, you'll have hands-on opportunities to apply your newfound knowledge and skills. Engaging exercises and projects will challenge you to put theory into practice as you work on your own music productions. With expert guidance and practical insights, you'll develop a keen ear for detail and an understanding of the nuances that elevate your music to professional standards. Join us on this transformative journey into the realm of music production. Unleash your creativity, develop your technical prowess, and learn to express yourself through the power of music. Whether your goal is to produce your own music, collaborate with other artists, or pursue a career in the music industry, this course will empower you to unleash your full potential as a music producer.",
        price: 79.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-17.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4298a2e3-064f-4d7e-80c3-4682e17698db",
        title: "Introduction to Data Science",
        description:
          "Dive into the world of data science and learn how to extract insights from data. Understand the basics of data analysis, data visualization, and statistical concepts. Explore programming languages like Python and R, and popular data science libraries and tools. Gain hands-on experience with data manipulation, exploratory data analysis, and machine learning algorithms. Whether you're a beginner or a professional looking to upskill, this course will equip you with the foundation needed to thrive in the field of data science.",
        price: 89.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Intermediate",
        estimatedCompletionTime: "4 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-18.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "23d9aaba-338b-43eb-a0e9-b3e395b372a1",
        title: "Introduction to Public Speaking",
        description:
          "Unlock the power of effective communication with this course on public speaking. Overcome stage fright, develop confidence, and master the art of delivering impactful speeches and presentations. Learn techniques for structuring speeches, engaging with the audience, and conveying your message with clarity and conviction. Whether you're a student, professional, or someone seeking personal growth, this course will help you become a confident and persuasive public speaker.",
        price: 69.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-19.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2b8d28a3-e4e2-45be-9910-dca62d6cb0aa",
        title: "Advanced Photography Masterclass",
        description:
          "Embark on a journey to master the art of photography. Learn essential techniques, composition principles, and camera settings to capture stunning images. Explore different genres of photography, including landscape, portrait, and street photography. Develop your creative eye, post-processing skills, and storytelling abilities. Whether you're a beginner or an enthusiast, this course will elevate your photography to new heights.",
        price: 79.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Advanced",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-20.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c2c77953-8793-448c-a235-82ae0abfb66f",
        title: "Creative Writing Workshop",
        description:
          "Unleash your imagination and hone your writing skills with this creative writing workshop. Explore different genres, from fiction to poetry, and learn techniques to develop compelling characters, plots, and settings. Dive into the world of storytelling, narrative structure, and dialogue. Receive feedback from experienced writers and refine your craft. Whether you're an aspiring author or simply passionate about writing, this course will ignite your creativity and help you find your unique voice.",
        price: 69.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Beginner",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-21.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "61081774-4cb2-48eb-bbe1-f53f59e2f719",
        title: "Introduction to Graphic Design",
        description:
          "Enter the world of graphic design and unleash your creativity. Learn fundamental design principles, typography, color theory, and layout techniques. Explore popular design software and tools used by professionals. Develop practical skills through hands-on projects, such as creating logos, posters, and social media graphics. Whether you're a beginner or aspiring designer, this course will equip you with the knowledge and skills to bring your creative visions to life.",
        price: 89.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Intermediate",
        estimatedCompletionTime: "3 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-22.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "0bd7cec0-3192-4686-a2f5-c4580965d25e",
        title: "Financial Planning and Investment Strategies",
        description:
          "Take control of your financial future with this comprehensive course on financial planning and investment strategies. Learn how to set financial goals, create budgets, and manage debt effectively. Understand the principles of investing, explore different asset classes, and develop strategies to build wealth over the long term. Gain insights into retirement planning, risk management, and portfolio diversification. Whether you're a novice investor or looking to enhance your financial knowledge, this course will empower you to make informed financial decisions.",
        price: 99.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Intermediate",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-23.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "aac44749-d4c1-4488-9962-b6dc8e2623ec",
        title: "Introduction to Artificial Intelligence",
        description:
          "Unleash the power of artificial intelligence (AI) and explore its vast applications. Learn about machine learning, neural networks, and data analysis techniques. Discover how AI is transforming industries such as healthcare, finance, and transportation. Dive into practical projects, including image recognition, natural language processing, and predictive modeling. Whether you're a technology enthusiast or aspiring AI professional, this course will provide a solid foundation in AI concepts and empower you to leverage its potential in various domains.",
        price: 119.99,
        creatorUserId: "99a10e20-45b8-426c-9d4b-2872d0044184",
        difficulty: "Advanced",
        estimatedCompletionTime: "2 Weeks",
        isApproved: true,
        isReviewed: true,
        isPublished: true,
        coursePosterLink: "http://localhost:8080/uploads/poster-24.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Courses", null, {});
  },
};