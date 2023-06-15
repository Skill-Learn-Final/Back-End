"use strict";

const { v4: uuid4 } = require("uuid");

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

    await queryInterface.bulkInsert("Chapters", [
      {
        id: "671e53c3-1a24-4eeb-9cab-ff366ad1fb27",
        title: "Chapter 1: What is Programming?",
        description:
          "In this chapter, you will learn what programming is, why it is useful, and what are some common types of programming languages. You will also learn how to write and run your first program using a simple online tool.",
        courseId: "729a1017-f38a-4cf8-abc1-e5642099c500",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a9558a48-db7c-4741-804a-2f9a83c33e15",
        title: "Chapter 2: Variables and Data Types",
        description:
          "In this chapter, you will learn how to store and manipulate different kinds of data in your programs, such as numbers, text, and logical values. You will also learn how to use variables to name and access your data, and how to choose the right data type for your needs.",
        courseId: "729a1017-f38a-4cf8-abc1-e5642099c500",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2a8f4840-146a-4548-8b9e-3e5f61bc0f55",
        title: "Chapter 3: Control Structures",
        description:
          "In this chapter, you will learn how to control the flow of your program using conditional statements, loops, and functions. You will also learn how to use these structures to create complex logic and avoid repetition in your code.",
        courseId: "729a1017-f38a-4cf8-abc1-e5642099c500",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "27655687-5e14-4f22-b482-7db6a3bd7b88",
        title: "Chapter 4: Data Structures and Algorithms",
        description:
          "In this chapter, you will learn how to organize and process large amounts of data using data structures such as arrays, lists, stacks, queues, trees, and graphs. You will also learn how to use algorithms to solve common problems such as sorting, searching, and finding the shortest path.",
        courseId: "729a1017-f38a-4cf8-abc1-e5642099c500",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9f42a141-e2f9-452c-95b8-e76cc94643a4",
        title: "Chapter 1: Mastering React",
        description:
          "In this chapter, you'll explore the intricacies of React, a powerful frontend framework used for building interactive user interfaces. Dive into component-based architecture, state management, and advanced React features like hooks and context.",
        courseId: "293a212f-4bac-4c05-9895-c94d3e2e88a3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "70013541-9db1-4425-b8e6-f948871a2f27",
        title: "Chapter 2: Advanced Backend with Node.js",
        description:
          "In this chapter, you'll dive into the world of Node.js, a JavaScript runtime that allows you to build scalable and efficient server-side applications. Learn about asynchronous programming, RESTful APIs, and data persistence with databases.",
        courseId: "293a212f-4bac-4c05-9895-c94d3e2e88a3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "29688796-8863-4d00-a9bb-b046ae8aebb4",
        title: "Chapter 3: Full-Stack Integration",
        description:
          "In this chapter, you'll bring together the frontend and backend components of a web application. Explore techniques for API integration, handling authentication and authorization, and optimizing performance across the full stack.",
        courseId: "293a212f-4bac-4c05-9895-c94d3e2e88a3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b1183c72-1027-4aa8-8866-7470e4d8017a",
        title: "Chapter 4: Deployment and Scaling",
        description:
          "In this chapter, you'll learn how to deploy your web applications to production environments and scale them to handle high traffic. Dive into containerization with Docker, cloud deployment with services like AWS, and performance optimization techniques.",
        courseId: "293a212f-4bac-4c05-9895-c94d3e2e88a3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "11f207cc-d069-4bc5-b0f1-1d7f13784181",
        title: "Chapter 1: Introduction to Machine Learning",
        description:
          "In this chapter, you'll be introduced to the fundamental concepts of machine learning. Explore different types of machine learning, understand the workflow of a machine learning project, and learn how to evaluate model performance.",
        courseId: "85ebf490-8010-4e6a-b681-c703b1af0c51",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "29799390-07bb-44e8-b5ce-ce3399099a12",
        title: "Chapter 2: Data Preprocessing and Feature Engineering",
        description:
          "In this chapter, you'll learn how to preprocess and clean your data to make it suitable for machine learning models. Explore techniques for handling missing data, feature scaling, categorical variable encoding, and feature selection.",
        courseId: "85ebf490-8010-4e6a-b681-c703b1af0c51",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f4353920-f411-4838-894d-5feabf01d081",
        title: "Chapter 3: Supervised Learning Algorithms",
        description:
          "In this chapter, you'll dive into supervised learning algorithms, including linear regression, logistic regression, decision trees, and ensemble methods. Understand the underlying principles of each algorithm and learn how to apply them to solve classification and regression tasks.",
        courseId: "85ebf490-8010-4e6a-b681-c703b1af0c51",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9896f63d-84f9-47dd-b2c8-f65059f72df4",
        title: "Chapter 4: Unsupervised Learning and Dimensionality Reduction",
        description:
          "In this chapter, you'll explore unsupervised learning techniques such as clustering and dimensionality reduction. Learn how to group similar data points, discover hidden patterns, and reduce the dimensionality of high-dimensional data.",
        courseId: "85ebf490-8010-4e6a-b681-c703b1af0c51",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "d77f909c-8891-4867-a8e8-e133c848878a",
        title: "Chapter 1: Swift Programming Fundamentals",
        description:
          "In this chapter, you'll get started with Swift, Apple's powerful programming language for iOS development. Learn the syntax, control flow, data types, and basic concepts necessary for building iOS applications.",
        courseId: "d499dfca-032e-4a63-b6c2-341a14cbf4e5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6873ce2c-d37d-4949-9ed8-d77fad42e06b",
        title: "Chapter 2: Building User Interfaces with SwiftUI",
        description:
          "In this chapter, you'll explore SwiftUI, Apple's modern UI framework for building declarative user interfaces. Dive into creating views, handling user input, and designing intuitive and responsive interfaces.",
        courseId: "d499dfca-032e-4a63-b6c2-341a14cbf4e5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e4d20bb0-1c2e-4ad2-bae4-75b1ea5a535e",
        title: "Chapter 3: Working with Data and APIs",
        description:
          "In this chapter, you'll learn how to work with data in your iOS applications. Explore techniques for data persistence, networking, and integrating RESTful APIs to fetch and update data from external sources.",
        courseId: "d499dfca-032e-4a63-b6c2-341a14cbf4e5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "608afdef-1180-4c0f-a46a-3e4de7e58f18",
        title: "Chapter 4: Advanced Topics in iOS Development",
        description:
          "In this chapter, you'll delve into advanced topics and techniques in iOS app development. Learn about advanced UI components, animations, navigation patterns, and how to leverage device features like Core Location and Core Motion.",
        courseId: "d499dfca-032e-4a63-b6c2-341a14cbf4e5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4698c949-0af8-49ff-a859-3be4891870c4",
        title: "Chapter 1: Introduction to Digital Marketing",
        description:
          "In this chapter, you'll be introduced to the fundamentals of digital marketing. Explore the different channels and strategies available, understand customer segmentation, and learn how to set measurable goals.",
        courseId: "a505cf78-593e-4511-83ec-e09dc01c682e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dc724e06-f500-4998-8084-9c6b1c9a49fd",
        title: "Chapter 2: Search Engine Optimization (SEO)",
        description:
          "In this chapter, you'll dive into the world of SEO. Learn how to optimize websites for search engines, conduct keyword research, and implement on-page and off-page optimization techniques.",
        courseId: "a505cf78-593e-4511-83ec-e09dc01c682e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b3b48be6-c50b-4cd5-bf56-5cda60db81e4",
        title: "Chapter 3: Social Media Marketing",
        description:
          "In this chapter, you'll explore the power of social media for marketing purposes. Learn how to create engaging content, build a social media presence, run effective ad campaigns, and analyze social media metrics.",
        courseId: "a505cf78-593e-4511-83ec-e09dc01c682e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5aae4c9e-11e6-453c-8dfa-0714f73c1199",
        title: "Chapter 4: Content Marketing and Email Marketing",
        description:
          "In this chapter, you'll discover the importance of content marketing and email marketing in driving customer engagement and conversions. Learn how to create compelling content, build email lists, and implement effective email marketing campaigns.",
        courseId: "a505cf78-593e-4511-83ec-e09dc01c682e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c9073449-c104-4107-868a-c182098d3bbd",
        title: "Chapter 1: Understanding Your Camera",
        description:
          "In this chapter, you'll get to know your camera inside out. Learn about different camera types, lenses, exposure settings, and shooting modes to capture the perfect shot.",
        courseId: "68f5a86f-65ea-4816-a70e-aa39cd9e948f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7ea6acad-d0a4-4e67-8683-4e281f68e1e6",
        title: "Chapter 2: Composition and Framing",
        description:
          "In this chapter, you'll explore the art of composition and framing. Learn about the rule of thirds, leading lines, symmetry, and other techniques to create visually appealing photographs.",
        courseId: "68f5a86f-65ea-4816-a70e-aa39cd9e948f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "24b8e7c3-4570-4276-88fa-01d594649831",
        title: "Chapter 3: Mastering Light and Exposure",
        description:
          "In this chapter, you'll delve into the principles of lighting and exposure. Learn how to control natural and artificial light, achieve proper exposure, and use light creatively to enhance your photographs.",
        courseId: "68f5a86f-65ea-4816-a70e-aa39cd9e948f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4fb113ff-9537-4223-8819-54ed02a4e6de",
        title: "Chapter 4: Post-Processing and Editing",
        description:
          "In this chapter, you'll learn how to bring your photographs to life through post-processing. Explore popular photo editing software, learn essential editing techniques, and discover how to enhance your images while maintaining their authenticity.",
        courseId: "68f5a86f-65ea-4816-a70e-aa39cd9e948f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e554cf9c-662a-4d78-80a0-996ab6e61e06",
        title: "Chapter 1: Introduction to Investing",
        description:
          "In this chapter, you'll be introduced to the world of investing. Understand the importance of investing, learn about different investment vehicles, and develop an investment mindset.",
        courseId: "a54e3a7f-9132-48a2-acab-9030001f427c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "185ea9e3-ed8c-464a-9e46-cce3a53af6c5",
        title: "Chapter 2: Fundamental Analysis",
        description:
          "In this chapter, you'll learn how to analyze stocks using fundamental analysis. Explore financial statements, valuation techniques, and key metrics to evaluate the intrinsic value of a company.",
        courseId: "a54e3a7f-9132-48a2-acab-9030001f427c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "783a0d6b-ec6a-4f02-8f5c-8e0afdaab8c1",
        title: "Chapter 3: Technical Analysis and Market Trends",
        description:
          "In this chapter, you'll dive into technical analysis and market trends. Learn how to interpret stock charts, identify patterns and trends, and use technical indicators to make buy and sell decisions.",
        courseId: "a54e3a7f-9132-48a2-acab-9030001f427c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9939c834-2d69-49de-a0d6-ca41db3cc994",
        title: "Chapter 4: Building a Winning Portfolio",
        description:
          "In this chapter, you'll discover the principles of portfolio construction. Learn how to build a diversified portfolio, allocate assets effectively, and manage risk to achieve your investment goals.",
        courseId: "a54e3a7f-9132-48a2-acab-9030001f427c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f7008504-9cb5-4efa-a867-3899ebe67879",
        title: "Chapter 1: Introduction to Creative Writing",
        description:
          "In this chapter, you'll be introduced to the fundamentals of creative writing. Explore different writing forms, understand the power of storytelling, and discover your unique writing voice.",
        courseId: "abab54c7-8f2b-4748-934e-4f487fd60a66",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e5cf7e4a-50e7-4acf-bdee-2334e2d285b2",
        title: "Chapter 2: Developing Compelling Characters",
        description:
          "In this chapter, you'll dive into the art of character development. Learn how to create relatable and memorable characters, develop their backstories, and infuse them with depth and authenticity.",
        courseId: "abab54c7-8f2b-4748-934e-4f487fd60a66",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "24a3830b-bd8e-476b-ba22-493b1c26ee49",
        title: "Chapter 3: Crafting Engaging Plots",
        description:
          "In this chapter, you'll explore the intricacies of plot construction. Learn how to create tension, build narrative arcs, and develop compelling storylines that captivate readers from beginning to end.",
        courseId: "abab54c7-8f2b-4748-934e-4f487fd60a66",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b3f54dff-1578-4aeb-a23a-3c0d8149da48",
        title: "Chapter 4: Polishing Your Prose",
        description:
          "In this chapter, you'll refine your writing style and language. Explore techniques for descriptive writing, crafting vivid imagery, and using literary devices to evoke emotions and engage readers.",
        courseId: "abab54c7-8f2b-4748-934e-4f487fd60a66",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "bfa6df2c-2345-4341-b88d-7b2bbfd379ae",
        title: "Chapter 1: Kitchen Fundamentals",
        description:
          "In this chapter, you'll familiarize yourself with the essential tools and equipment found in every kitchen. Learn basic knife skills, proper measuring techniques, and fundamental cooking methods.",
        courseId: "9cbef3a6-e225-4fcc-82e5-e22896c80e14",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "d5aae22a-50c4-4599-ab5e-f1a1d0260f31",
        title: "Chapter 2: Mastering Cooking Techniques",
        description:
          "In this chapter, you'll delve into the world of cooking techniques. From sautéing and braising to grilling and baking, learn how to cook ingredients to perfection and enhance their flavors.",
        courseId: "9cbef3a6-e225-4fcc-82e5-e22896c80e14",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7d8fc77b-2f28-4594-ab10-32282c306879",
        title: "Chapter 3: Exploring International Cuisines",
        description:
          "In this chapter, you'll embark on a culinary adventure around the world. Explore the flavors and techniques of various international cuisines, including Italian, Asian, Mediterranean, and more.",
        courseId: "9cbef3a6-e225-4fcc-82e5-e22896c80e14",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "32f73f44-e8d3-44b8-9bee-40dcde00e9ca",
        title: "Chapter 4: Elevating Your Dishes",
        description:
          "In this chapter, you'll discover the art of plating and presentation. Learn how to create visually stunning dishes, garnish like a pro, and bring restaurant-quality elegance to your meals.",
        courseId: "9cbef3a6-e225-4fcc-82e5-e22896c80e14",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "bce65036-2829-48b8-9da4-e2ae572e886d",
        title: "Chapter 1: Introduction to Graphic Design",
        description:
          "In this chapter, you'll be introduced to the fundamentals of graphic design. Explore the role of design in visual communication, understand design principles, and learn how to effectively convey messages through visuals.",
        courseId: "8002c2f6-438f-4044-96f9-abcf2bdf0258",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "509045fa-928e-4183-b73e-fa7700a52a2c",
        title: "Chapter 2: Typography and Layout Design",
        description:
          "In this chapter, you'll dive into the world of typography and layout design. Learn how to choose and pair fonts, create balanced compositions, and design visually appealing layouts for various mediums.",
        courseId: "8002c2f6-438f-4044-96f9-abcf2bdf0258",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4c6afe83-bbe6-4904-a58c-9225c8249c81",
        title: "Chapter 3: Color Theory and Branding",
        description:
          "In this chapter, you'll explore the psychology of color and its impact on design. Learn how to create harmonious color palettes, understand color meanings, and develop branding concepts through effective use of color.",
        courseId: "8002c2f6-438f-4044-96f9-abcf2bdf0258",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2962290d-9a9f-4ce3-89cb-853c665ae6ed",
        title: "Chapter 4: Mastering Design Software",
        description:
          "In this chapter, you'll gain proficiency in popular graphic design software. Learn how to use tools and features to create and manipulate graphics, enhance images, and prepare designs for different output formats.",
        courseId: "8002c2f6-438f-4044-96f9-abcf2bdf0258",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e0f26bd1-3bc3-48e0-ac49-612cb5da4a20",
        title: "Chapter 1: Introduction to Psychology",
        description:
          "In this chapter, you'll be introduced to the field of psychology. Learn about the history of psychology, major schools of thought, and different perspectives on understanding human behavior and mental processes.",
        courseId: "2442c5b4-5227-4287-a515-25a571a7b692",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e02def77-8206-4454-9e72-a6f72fb65737",
        title: "Chapter 2: Biological Foundations of Behavior",
        description:
          "In this chapter, you'll explore the biological underpinnings of behavior. Learn about the structure and function of the brain, the nervous system, and the influence of genetics and hormones on behavior.",
        courseId: "2442c5b4-5227-4287-a515-25a571a7b692",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f37927e1-29dc-4bbe-8054-3b62b3e6aebf",
        title: "Chapter 3: Cognitive Processes and Memory",
        description:
          "In this chapter, you'll delve into the realm of cognition and memory. Explore attention, perception, thinking, problem-solving, and the processes involved in encoding, storage, and retrieval of information.",
        courseId: "2442c5b4-5227-4287-a515-25a571a7b692",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "351264d3-8bef-44c3-9e1d-cbad2525730a",
        title: "Chapter 4: Social Psychology and Behavior",
        description:
          "In this chapter, you'll discover the fascinating world of social psychology. Learn about social perception, attitudes, conformity, group dynamics, and the impact of social interactions on individual behavior.",
        courseId: "2442c5b4-5227-4287-a515-25a571a7b692",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e7434ce8-f949-4feb-b4fc-2b9a85a4487b",
        title: "Chapter 1: Introduction to Digital Marketing",
        description:
          "In this chapter, you'll be introduced to the fundamentals of digital marketing. Explore the evolution of marketing in the digital age, understand key concepts, and learn about the various digital marketing channels available.",
        courseId: "e22e27ad-ecc2-426b-b76b-4d8adf36f0f8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "071f59f9-758a-4740-a523-5760939aa0a7",
        title: "Chapter 2: Search Engine Optimization (SEO)",
        description:
          "In this chapter, you'll dive into the world of SEO. Learn how to optimize websites for search engines, conduct keyword research, and implement on-page and off-page SEO strategies to improve search rankings.",
        courseId: "e22e27ad-ecc2-426b-b76b-4d8adf36f0f8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "070c5b18-079b-46ba-8373-641be5fe44d5",
        title: "Chapter 3: Social Media Marketing",
        description:
          "In this chapter, you'll explore the power of social media in marketing. Learn how to create engaging social media campaigns, build a strong online presence, and leverage social media platforms to reach and engage your target audience.",
        courseId: "e22e27ad-ecc2-426b-b76b-4d8adf36f0f8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "fb156c54-ad54-4246-8fdb-18adadb42c82",
        title: "Chapter 4: Email Marketing and Analytics",
        description:
          "In this chapter, you'll discover the effectiveness of email marketing and the importance of analytics in digital marketing. Learn how to create compelling email campaigns, measure campaign performance, and make data-driven marketing decisions.",
        courseId: "e22e27ad-ecc2-426b-b76b-4d8adf36f0f8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ffd23af0-8d14-484d-a3d7-07483f1cbedb",
        title: "Chapter 1: Introduction to Artificial Intelligence",
        description:
          "In this chapter, you'll be introduced to the field of artificial intelligence. Learn about the history of AI, understand the different types of AI, and explore the ethical considerations surrounding AI development and implementation.",
        courseId: "2c29e065-86ba-4232-bc8b-a43cb3388bb2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7ffb4e69-3284-41aa-aa3e-3b0b5fe53f95",
        title: "Chapter 2: Machine Learning Fundamentals",
        description:
          "In this chapter, you'll dive into the world of machine learning. Understand the basic principles of machine learning, explore different algorithms, and learn how to train and evaluate machine learning models.",
        courseId: "2c29e065-86ba-4232-bc8b-a43cb3388bb2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "343b0a2e-d077-430f-99a6-74624bb33a31",
        title: "Chapter 3: Neural Networks and Deep Learning",
        description:
          "In this chapter, you'll explore the fascinating realm of neural networks and deep learning. Understand the architecture and working principles of neural networks, explore deep learning frameworks, and learn how to build and train deep learning models.",
        courseId: "2c29e065-86ba-4232-bc8b-a43cb3388bb2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "249c2580-138c-4cad-aa11-7e21bfb75d89",
        title: "Chapter 4: Applications of AI",
        description:
          "In this chapter, you'll discover the wide range of applications of AI in various industries. Explore use cases in healthcare, finance, autonomous vehicles, natural language processing, and computer vision.",
        courseId: "2c29e065-86ba-4232-bc8b-a43cb3388bb2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "44d28273-1874-47c8-af8a-94a3aa8cfce9",
        title: "Chapter 1: Getting Started with Photography",
        description:
          "In this chapter, you'll get acquainted with the world of photography. Understand the basics of cameras, lenses, and exposure settings. Learn how to handle your camera, compose visually pleasing shots, and capture the perfect exposure.",
        courseId: "f89e84c4-a7c7-4e81-a9b6-3727da9ed54d",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2f5528de-380a-4e55-8f54-4aa9eec5da96",
        title: "Chapter 2: Mastering Composition and Lighting",
        description:
          "In this chapter, you'll delve into the art of composition and lighting. Learn how to create balanced and visually appealing compositions, utilize different lighting techniques, and make use of natural and artificial light sources to enhance your photographs.",
        courseId: "f89e84c4-a7c7-4e81-a9b6-3727da9ed54d",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ba00b0c1-fd13-4d1d-ba19-9a07464acfb1",
        title: "Chapter 3: Exploring Photography Genres",
        description:
          "In this chapter, you'll explore various genres of photography. From landscapes and portraits to wildlife and street photography, learn the techniques and best practices for capturing captivating images in each genre.",
        courseId: "f89e84c4-a7c7-4e81-a9b6-3727da9ed54d",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "138cda5d-3206-4d28-b7f7-8b2c5b8d8b50",
        title: "Chapter 4: Post-Processing and Editing",
        description:
          "In this chapter, you'll learn how to bring out the best in your photographs through post-processing. Discover popular photo editing software, understand basic editing techniques, and enhance your images to achieve the desired visual impact.",
        courseId: "f89e84c4-a7c7-4e81-a9b6-3727da9ed54d",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "491258f8-a5f5-47f2-928e-4e71a0c4e601",
        title: "Chapter 1: Introduction to Creative Writing",
        description:
          "In this chapter, you'll be introduced to the art of creative writing. Explore different writing genres, understand the writing process, and learn techniques to overcome writer's block and unleash your creativity.",
        courseId: "4949c4ad-84c6-4862-becd-98c1d3705eeb",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2a678311-659c-431c-ac77-2edc6eb5039e",
        title: "Chapter 2: Developing Compelling Characters",
        description:
          "In this chapter, you'll dive into character development. Learn how to create memorable characters, build their backstories, and make them come alive on the page through vivid descriptions and authentic dialogue.",
        courseId: "4949c4ad-84c6-4862-becd-98c1d3705eeb",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "1df4cb81-d3cd-4fe9-97dd-d6bd621d8f11",
        title: "Chapter 3: Crafting Engaging Plots",
        description:
          "In this chapter, you'll explore the art of crafting engaging plots. Learn how to structure your stories, create tension and conflict, and build suspense to keep readers hooked from beginning to end.",
        courseId: "4949c4ad-84c6-4862-becd-98c1d3705eeb",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3d4809be-2dd6-4413-b740-71aa27121c1a",
        title: "Chapter 4: Finding Your Writing Style",
        description:
          "In this chapter, you'll discover techniques to find your unique writing style. Experiment with different literary devices, explore the power of language, and develop your voice as a writer.",
        courseId: "4949c4ad-84c6-4862-becd-98c1d3705eeb",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b719b77b-9ea9-439e-9abc-7e166dfce878",
        title: "Chapter 1: Introduction to Music Production",
        description:
          "In this chapter, you'll be introduced to the world of music production. Learn about the role of a music producer, understand the basics of sound and audio, and explore the different stages of music production.",
        courseId: "282666bd-6d00-45c8-a2d5-7bca0544f05d",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a876fbe9-e69f-4179-bc58-068e8c5ecb19",
        title: "Chapter 2: Recording and Editing Audio",
        description:
          "In this chapter, you'll dive into the realm of audio recording and editing. Learn how to set up a home recording studio, record audio tracks, and edit and manipulate audio using digital tools.",
        courseId: "282666bd-6d00-45c8-a2d5-7bca0544f05d",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "40b94cc9-cad6-45bf-baee-244d0197e87e",
        title: "Chapter 3: Music Theory and Composition",
        description:
          "In this chapter, you'll explore the foundations of music theory and composition. Learn about scales, chords, melody, and rhythm, and understand how to create harmonious musical arrangements.",
        courseId: "282666bd-6d00-45c8-a2d5-7bca0544f05d",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4a6730e6-e969-46db-838e-46309529dfb3",
        title: "Chapter 4: Mixing and Mastering",
        description:
          "In this chapter, you'll discover the art of mixing and mastering music. Learn how to balance audio levels, apply effects and equalization, and prepare your tracks for distribution and streaming platforms.",
        courseId: "282666bd-6d00-45c8-a2d5-7bca0544f05d",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "411f1004-34cd-4230-8fc8-02b3090b7eaa",
        title: "Chapter 1: Introduction to Music Production",
        description:
          "In this chapter, you'll be introduced to the world of music production. Learn about the role of a music producer, understand the basics of sound and audio, and explore the different stages of music production.",
        courseId: "46f5e899-f36d-4381-bf7e-25d7fadb84ef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a979b471-3393-44f7-b615-99cbf8031fbd",
        title: "Chapter 2: Recording and Editing Audio",
        description:
          "In this chapter, you'll dive into the realm of audio recording and editing. Learn how to set up a home recording studio, record audio tracks, and edit and manipulate audio using digital tools.",
        courseId: "46f5e899-f36d-4381-bf7e-25d7fadb84ef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c4f5c334-7b6b-4a93-a5f3-d0b952bd3e9c",
        title: "Chapter 3: Music Theory and Composition",
        description:
          "In this chapter, you'll explore the foundations of music theory and composition. Learn about scales, chords, melody, and rhythm, and understand how to create harmonious musical arrangements.",
        courseId: "46f5e899-f36d-4381-bf7e-25d7fadb84ef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "12d9fa81-b3d0-4fd5-aafa-df08be4ef46d",
        title: "Chapter 4: Mixing and Mastering",
        description:
          "In this chapter, you'll discover the art of mixing and mastering music. Learn how to balance audio levels, apply effects and equalization, and prepare your tracks for distribution and streaming platforms.",
        courseId: "46f5e899-f36d-4381-bf7e-25d7fadb84ef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b59391f9-6f3a-4e73-8b78-b469a9d652b9",
        title: "Chapter 1: Introduction to Data Science",
        description:
          "In this chapter, you'll be introduced to the field of data science. Understand the role of data scientists, explore the data science workflow, and learn about the tools and technologies used in data science projects.",
        courseId: "4298a2e3-064f-4d7e-80c3-4682e17698db",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cca3405a-7abc-4c46-8481-c51567e42824",
        title: "Chapter 2: Data Manipulation and Cleaning",
        description:
          "In this chapter, you'll dive into the world of data manipulation and cleaning. Learn how to load and preprocess data, handle missing values, and transform datasets to make them suitable for analysis.",
        courseId: "4298a2e3-064f-4d7e-80c3-4682e17698db",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7f974925-eefc-44b7-b295-ff393958f0f6",
        title: "Chapter 3: Exploratory Data Analysis",
        description:
          "In this chapter, you'll explore the art of exploratory data analysis (EDA). Learn how to summarize and visualize data, identify patterns and relationships, and gain insights from datasets.",
        courseId: "4298a2e3-064f-4d7e-80c3-4682e17698db",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "990ebc1b-631c-450d-b8ab-52e42f74ede9",
        title: "Chapter 4: Machine Learning Basics",
        description:
          "In this chapter, you'll discover the fundamentals of machine learning. Understand different types of machine learning algorithms, learn how to train and evaluate models, and apply machine learning techniques to solve real-world problems.",
        courseId: "4298a2e3-064f-4d7e-80c3-4682e17698db",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b20e93f3-930c-4f39-a52f-2ce4634ca402",
        title: "Chapter 1: Introduction to Public Speaking",
        description:
          "In this chapter, you'll be introduced to the world of public speaking. Understand the importance of public speaking skills, overcome common fears and obstacles, and learn strategies for effective communication.",
        courseId: "23d9aaba-338b-43eb-a0e9-b3e395b372a1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6600e54d-bbfc-472b-bf10-201300b0887f",
        title: "Chapter 2: Speech Preparation and Structure",
        description:
          "In this chapter, you'll dive into the art of speech preparation and structure. Learn how to identify your purpose, craft compelling messages, and structure your speeches for maximum impact.",
        courseId: "23d9aaba-338b-43eb-a0e9-b3e395b372a1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "51e94a13-6fae-48d3-9ad4-73fd36b85980",
        title: "Chapter 3: Delivery Techniques and Body Language",
        description:
          "In this chapter, you'll explore delivery techniques and the power of body language in public speaking. Learn how to use your voice effectively, enhance your non-verbal communication, and engage with the audience.",
        courseId: "23d9aaba-338b-43eb-a0e9-b3e395b372a1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5a447361-ffb4-466c-aea3-43f8ddeb721d",
        title: "Chapter 4: Overcoming Challenges and Q&A Sessions",
        description:
          "In this chapter, you'll discover strategies for overcoming common challenges in public speaking. Learn how to handle nervousness, navigate Q&A sessions, and adapt to different speaking scenarios.",
        courseId: "23d9aaba-338b-43eb-a0e9-b3e395b372a1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "81228602-a17e-44ff-b0af-f69ad3935fad",
        title: "Chapter 1: Introduction to Photography",
        description:
          "In this chapter, you'll be introduced to the world of photography. Learn about camera types, exposure basics, and the key elements of a compelling photograph.",
        courseId: "2b8d28a3-e4e2-45be-9910-dca62d6cb0aa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "35a20bfe-47fb-40e6-8f0f-b1ac8c2101b4",
        title: "Chapter 2: Composition and Framing",
        description:
          "In this chapter, you'll explore composition techniques and framing principles. Learn how to create visually pleasing images, understand the rule of thirds, and use lines, shapes, and patterns to enhance your photos.",
        courseId: "2b8d28a3-e4e2-45be-9910-dca62d6cb0aa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ccbf0317-0006-4c5d-9662-83353354d92c",
        title: "Chapter 3: Mastering Camera Settings",
        description:
          "In this chapter, you'll dive into camera settings and controls. Learn how to adjust aperture, shutter speed, and ISO for different lighting conditions, and discover advanced features like exposure compensation and white balance.",
        courseId: "2b8d28a3-e4e2-45be-9910-dca62d6cb0aa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "d5e97092-f252-4c8a-9806-30deb836009f",
        title: "Chapter 4: Editing and Post-Processing",
        description:
          "In this chapter, you'll discover the art of editing and post-processing. Learn how to enhance colors, adjust contrast, and retouch images using popular software tools. Develop your unique editing style to bring out the best in your photographs.",
        courseId: "2b8d28a3-e4e2-45be-9910-dca62d6cb0aa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3f5ef809-bb2f-4618-b76b-3c1fd103d2ff",
        title: "Chapter 1: Introduction to Creative Writing",
        description:
          "In this chapter, you'll be introduced to the art of creative writing. Explore different writing genres, understand the writing process, and learn techniques to overcome writer's block and unleash your creativity.",
        courseId: "c2c77953-8793-448c-a235-82ae0abfb66f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "026bf00d-3cee-4de1-bf21-f03c1e3585ee",
        title: "Chapter 2: Developing Compelling Characters",
        description:
          "In this chapter, you'll dive into character development. Learn how to create memorable characters, build their backstories, and make them come alive on the page through vivid descriptions and authentic dialogue.",
        courseId: "c2c77953-8793-448c-a235-82ae0abfb66f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "72aff9e0-2e0a-45b4-ab3e-304953b1f830",
        title: "Chapter 3: Crafting Engaging Plots",
        description:
          "In this chapter, you'll explore the art of crafting engaging plots. Learn how to structure your stories, create tension and conflict, and build suspense to keep readers hooked from beginning to end.",
        courseId: "c2c77953-8793-448c-a235-82ae0abfb66f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "bc72ea12-226e-473f-bed5-0e48e16efae4",
        title: "Chapter 4: Finding Your Writing Style",
        description:
          "In this chapter, you'll discover techniques to find your unique writing style. Experiment with different literary devices, explore the power of language, and develop your voice as a writer.",
        courseId: "c2c77953-8793-448c-a235-82ae0abfb66f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c409caad-24fa-443a-b6e4-a6544d937a04",
        title: "Chapter 1: Introduction to Graphic Design",
        description:
          "In this chapter, you'll be introduced to the world of graphic design. Understand the role of graphic designers, explore the design process, and learn about the principles of visual communication.",
        courseId: "61081774-4cb2-48eb-bbe1-f53f59e2f719",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8ef09652-9e49-42bc-a88a-c03cb602f34d",
        title: "Chapter 2: Typography and Layout",
        description:
          "In this chapter, you'll dive into the art of typography and layout design. Learn how to choose fonts, create harmonious typographic compositions, and arrange elements on a page to create visually appealing designs.",
        courseId: "61081774-4cb2-48eb-bbe1-f53f59e2f719",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5ca61241-8111-4e32-b1f4-a7ea07c4742c",
        title: "Chapter 3: Color Theory and Application",
        description:
          "In this chapter, you'll explore the principles of color theory and its application in graphic design. Learn how to choose color schemes, create mood and visual hierarchy, and use color effectively to convey messages.",
        courseId: "61081774-4cb2-48eb-bbe1-f53f59e2f719",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5b999502-8b76-4a63-9bea-e1c9050e0a25",
        title: "Chapter 4: Design Software and Tools",
        description:
          "In this chapter, you'll discover popular design software and tools used by graphic designers. Get hands-on experience with industry-standard applications, learn essential design techniques, and unleash your creativity through practical projects.",
        courseId: "61081774-4cb2-48eb-bbe1-f53f59e2f719",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a517437f-4077-4262-84fa-e20c84bacb46",
        title: "Chapter 1: Introduction to Financial Planning",
        description:
          "In this chapter, you'll be introduced to the world of financial planning. Understand the importance of financial goals, assess your current financial situation, and learn how to create a personalized financial plan.",
        courseId: "0bd7cec0-3192-4686-a2f5-c4580965d25e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "65270ecf-3fac-4a8c-a938-72bec5a45b51",
        title: "Chapter 2: Budgeting and Debt Management",
        description:
          "In this chapter, you'll dive into the art of budgeting and debt management. Learn how to create a budget, track expenses, and develop strategies to pay off debt efficiently and achieve financial freedom.",
        courseId: "0bd7cec0-3192-4686-a2f5-c4580965d25e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "81712303-82f0-4756-8a88-0d33c39fd6dc",
        title: "Chapter 3: Investment Principles and Strategies",
        description:
          "In this chapter, you'll explore investment principles and strategies. Understand different asset classes, learn how to analyze investment opportunities, and develop a diversified investment portfolio aligned with your financial goals.",
        courseId: "0bd7cec0-3192-4686-a2f5-c4580965d25e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "599905bd-dc0f-4eb3-ae0b-f20c6896ce88",
        title: "Chapter 4: Retirement Planning and Risk Management",
        description:
          "In this chapter, you'll discover the essentials of retirement planning and risk management. Learn how to plan for retirement, estimate future expenses, and mitigate financial risks through insurance and other risk management techniques.",
        courseId: "0bd7cec0-3192-4686-a2f5-c4580965d25e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8fbceb6e-eaff-4476-9c16-c74f0d089338",
        title: "Chapter 1: Introduction to Artificial Intelligence",
        description:
          "In this chapter, you'll be introduced to the world of artificial intelligence. Understand the goals and applications of AI, explore its historical context, and learn about the ethical considerations surrounding AI development and deployment.",
        courseId: "aac44749-d4c1-4488-9962-b6dc8e2623ec",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "268b8377-1a41-4c8f-8050-35c7492f84ad",
        title: "Chapter 2: Machine Learning Fundamentals",
        description:
          "In this chapter, you'll dive into the fundamentals of machine learning. Learn about different types of machine learning algorithms, explore supervised and unsupervised learning techniques, and understand how to train and evaluate models.",
        courseId: "aac44749-d4c1-4488-9962-b6dc8e2623ec",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "aa4e46a7-5454-4bd7-9f50-15cb28bf127c",
        title: "Chapter 3: Neural Networks and Deep Learning",
        description:
          "In this chapter, you'll explore the world of neural networks and deep learning. Understand the architecture of artificial neural networks, learn how to build and train deep learning models, and explore advanced topics such as convolutional and recurrent neural networks.",
        courseId: "aac44749-d4c1-4488-9962-b6dc8e2623ec",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f7e74469-8cf6-42a8-bd89-5beb77c0ada0",
        title: "Chapter 4: AI in Practice",
        description:
          "In this chapter, you'll discover practical applications of AI. Dive into real-world projects, such as image recognition, natural language processing, and predictive modeling. Gain hands-on experience with popular AI libraries and frameworks.",
        courseId: "aac44749-d4c1-4488-9962-b6dc8e2623ec",
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

    await queryInterface.bulkDelete("Chapters", null, {});
  },
};
