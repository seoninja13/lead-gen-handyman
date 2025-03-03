# Handyman v2 Project Documentation

This document serves as the central hub for all information related to the Handyman v2 project.

## Table of Contents

* [Project Overview](#project-overview)
* [URL Structure](#url-structure)
* [Data Model](#data-model)
* [Adapting the FindHouse Template](#adapting-the-findhouse-template)
* [Technical Implementation](#technical-implementation)
    * [Directory Structure](#directory-structure)
    * [Dependencies](#dependencies)
    * [Supabase Integration](#supabase-integration)
    * [Routing](#routing)
    * [Component Development](#component-development)
* [SEO Strategy](#seo-strategy)
* [UI/UX Design](#uiux-design)
* [Future Considerations](#future-considerations)


## Project Overview

The Handyman v2 project aims to create a website for handyman services based on the FindHouse real estate template. The goal is to adapt this template for a handyman services website, integrate Supabase for database operations, and potentially connect to OpenAI for features like enriched content generation.

This documentation is intended to provide a comprehensive overview of the project for new developers joining the team. It covers the project's architecture, data model, SEO strategy, UI/UX design, and technical implementation details.

## Getting Started

To get started with the Handyman v2 project, follow these steps:

1.  **Clone the repository:** Clone the project repository to your local machine.
2.  **Install dependencies:** Navigate to the `@handyman-v2/Envato-template-files/themeforest-findhouse-real-estate-react-nextjs-template` directory and run `yarn install` to install the project dependencies.
3.  **Configure environment variables:** Create a `.env.local` file in the `findhouse` directory and add the necessary environment variables, including the Supabase URL and API key.
4.  **Run the development server:** Run `yarn dev` to start the development server.
5.  **Access the application:** Access the application in your browser at `http://localhost:3000`.

## URL Structure

The following URL structure will be used for the Handyman v2 website:

* **Main Services Page:** `/services`
* **Specific Service Pages:** `/services/[service-slug]` (e.g., `/services/carpentry`)
* **Location-Specific Service Pages:** `/services/[service-slug]/[location-slug]` (e.g., `/services/carpentry/sacramento`)
* **Business-Specific Service Pages per location:** `/services/[service-slug]/[location-slug]/[business-slug]` (e.g., `/services/carpentry/sacramento/abd-handyman`)

## Data Model

The project uses Supabase as the backend database. The following tables are core to the application:

*   **bookings:** Stores information about bookings made by clients, including the business, client, service date, and status.
    *   Columns: `id`, `business_id`, `client_id`, `service_date`, `status`, `created_at`
*   **businesses:** Contains details about handyman businesses, including their services, location, contact information, and reviews.
    *   Columns: `id`, `user_id`, `business_name`, `type_of_services`, `hourly_rate`, `created_at`, `website`, `phone`, `full_address`, `latitude`, `longitude`, `time_zone`, `plus_code`, `area_service`, `rating`, `reviews`, `reviews_link`, `reviews_tags`, `reviews_per_score`, `reviews_per_score_1`, `reviews_per_score_2`, `reviews_per_score_3`, `reviews_per_score_4`, `reviews_per_score_5`, `photos_count`, `photo`, `street_view`, `located_in`, `working_hours`, `working_hours_old_format`, `popular_times`, `business_status`, `about`, `logo`, `description`, `typical_time_spent`, `verified`, `reservation_links`, `booking_appointment_link`, `menu_link`, `order_links`, `location_link`, `location_reviews_link`, `place_id`, `google_id`, `cid`, `kgmid`, `reviews_id`, `located_google_id`, `email_1`, `email_1_full_name`, `email_1_first_name`, `email_1_last_name`, `email_1_title`, `email_1_phone`, `email_2`, `email_2_full_name`, `email_2_first_name`, `email_2_last_name`, `email_2_title`, `email_2_phone`, `email_3`, `email_3_full_name`, `email_3_first_name`, `email_3_last_name`, `email_3_title`, `email_3_phone`, `phone_1`, `phone_2`, `phone_3`, `facebook`, `instagram`, `linkedin`, `tiktok`, `medium`, `reddit`, `skype`, `snapchat`, `telegram`, `whatsapp`, `twitter`, `vimeo`, `youtube`, `crunchbase`, `website_title`, `website_generator`, `website_description`, `website_keywords`, `website_has_fb_pixel`, `website_has_google_tag`, `enriched_description`
*   **cities:** Lists the cities served by the handyman businesses.
    *   Columns: `id`, `name`, `created_at`
*   **reviews:** Stores customer reviews for businesses.
    *   Columns: `id`, `business_id`, `reviewer_id`, `rating`, `comment`, `created_at`
*   **services:** Lists the different types of handyman services offered.
    *   Columns: `id`, `name`, `description`, `created_at`

The following tables are legacy and not actively used:

*   cities_v1_legacy
*   city_services_v1_legacy
*   services_v1_legacy

The `testcrud` table is used for testing purposes.

## Adapting the FindHouse Template

The FindHouse template will be adapted to fit the Handyman service context. This involves replacing placeholder content, customizing the UI/UX, and integrating with the Supabase database.

**Mapping FindHouse Features to Handyman Concepts:**

*   **Properties/Listings:** Map to `businesses`.
*   **Property Types/Categories:** Map to `services`.
*   **Agents:** Repurpose or remove.
*   **Cities/Locations:** Map to `cities`.
*   **Reviews:** Map to `reviews`.
*   **Bookings:** Map to `bookings`.

**Key UI/UX Adaptations:**

*   **Homepage:** Showcase featured businesses, popular services, and location-based search. We can also feature a section for browsing services offered.
*   **Search and Filtering:** Allow users to search and filter businesses by service type, location, and availability.
*   **Business Details Page:** Display detailed information about each business, including services, contact information, location, reviews, and a booking form.
*   **Services Page:** Create a page to list and describe the various handyman services offered, allowing users to filter businesses by service type.
*   **Booking System:** Design and implement a user-friendly booking system integrated with the `bookings` table.

## Technical Implementation

The technical implementation will involve the following steps:

### Directory Structure

The project follows a Next.js directory structure. Key directories include:

*   `app`: Contains the application's pages and routing logic.
*   `components`: Contains reusable UI components.
*   `data`: Contains static data, such as testimonials and partner logos.
*   `features`: Contains Redux-related files (actions, reducers, and selectors).
*   `public`: Contains static assets, such as images and fonts.
*   `utils`: Contains utility functions, including the Supabase client.

### Dependencies

The project uses the following key dependencies:

*   `next`: The Next.js framework.
*   `react`: The React library.
*   `@supabase/supabase-js`: The Supabase client library.
*   `react-slick`: For creating sliders.
*   `sass`: For styling.

### Supabase Integration

The Supabase integration will involve the following steps:

1.  **Initialize the Supabase client:** The Supabase client is initialized in `utils/supabase/client.ts`.
2.  **Configure environment variables:** The Supabase URL and API key are stored in a `.env.local` file.
3.  **Implement CRUD operations:** Implement create, read, update, and delete operations for the core entities (businesses, services, cities, reviews, and bookings).
4.  **Refactor for better structure:** Move Supabase-related logic into separate files within the `utils/supabase` directory and create a `types` directory for TypeScript types.

### Routing

The project uses Next.js's file-based routing system. Dynamic routes will be used for business details pages (`/services/[service-slug]/[location-slug]/[business-slug]`) and service categories (`/services/[service-slug]`).

### Component Development

Custom components will be developed to display handyman-specific information, such as business listings, service details, reviews, and booking forms. Existing components from the FindHouse template will be adapted as needed.

## SEO Strategy

The SEO strategy will focus on the following:

*   **URL structure:** Using a clear and SEO-friendly URL structure (as described above).
*   **Keywords:** Incorporating relevant keywords into page titles, descriptions, and content.
*   **Schema markup:** Implementing schema markup to provide search engines with structured data about businesses and services.
*   **Content differentiation:** Creating unique and high-quality content for each business and service.
*   **Local SEO:** Optimizing for local search queries by including location-specific details.

## UI/UX Design

The UI/UX design will focus on creating a user-friendly and visually appealing website that is tailored to the needs of handyman service customers. This will involve:

*   **Adapting the FindHouse template:** Replacing placeholder content and components with content and components relevant to the handyman service.
*   **Customizing the UI/UX:** Modifying the layout, color scheme, navigation, and overall design to better suit a handyman service website.
*   **Ensuring mobile responsiveness:** Making sure the website is fully responsive and works well on all devices.

## Future Considerations

*   **OpenAI Integration:** Explore potential use cases for OpenAI, such as content generation and chatbots.
*   **Advanced Search and Filtering:** Implement more advanced search and filtering options.
*   **User Accounts and Authentication:** Implement user accounts and authentication for businesses and clients.

This documentation will be continuously updated as the project progresses.
</final_file_content>
</replace_in_file>
```

## URL Structure

The following URL structure will be used for the Handyman v2 website:

* **Main Services Page:** `/services`
* **Specific Service Pages:** `/services/[service-slug]` (e.g., `/services/carpentry`)
* **Location-Specific Service Pages:** `/services/[service-slug]/[location-slug]` (e.g., `/services/carpentry/sacramento`)
* **Business-Specific Service Pages per location:** `/services/[service-slug]/[location-slug]/[business-slug]` (e.g., `/services/carpentry/sacramento/abd-handyman`)

This structure is designed to be SEO-friendly and easy for users to navigate.

## Data Model

The project uses Supabase as the backend database. The following tables are core to the application:

* **bookings:** Stores information about bookings made by clients.
* **businesses:** Contains details about handyman businesses, including their services, location, contact information, and reviews.
* **cities:** Lists the cities served by the handyman businesses.
* **reviews:** Stores customer reviews for businesses.
* **services:** Lists the different types of handyman services offered.

The following tables are legacy and not actively used:

* cities_v1_legacy
* city_services_v1_legacy
* services_v1_legacy

The `testcrud` table is used for testing purposes.

## Adapting the FindHouse Template

The FindHouse template will be adapted to fit the Handyman service context.  This involves replacing placeholder content, customizing the UI/UX, and integrating with the Supabase database.

**Mapping FindHouse Features to Handyman Concepts:**

* **Properties/Listings:** Map to `businesses`.
* **Property Types/Categories:** Map to `services`.
* **Agents:**  Repurpose or remove.
* **Cities/Locations:** Map to `cities`.
* **Reviews:** Map to `reviews`.
* **Bookings:** Map to `bookings`.

**Key UI/UX Adaptations:**

* **Homepage:** Showcase featured businesses, popular services, and location-based search.
* **Search and Filtering:** Allow users to search and filter businesses by service type, location, and availability.
* **Business Details Page:** Display detailed information about each business, including services, contact information, location, reviews, and a booking form.
* **Services Page:** List and describe the various handyman services offered, allowing users to filter businesses by service type.
* **Booking System:** Implement a user-friendly booking system integrated with the `bookings` table.


## Technical Implementation

* **Supabase Integration:** Use Supabase client library for data fetching and updates.
* **Routing:** Implement dynamic routing for businesses, services, and locations.
* **Component Development:** Develop custom components for displaying handyman-specific information.

## Future Considerations

* **OpenAI Integration:** Explore potential use cases for OpenAI, such as content generation and chatbots.
* **Advanced Search and Filtering:** Implement more advanced search and filtering options.
* **User Accounts and Authentication:** Implement user accounts and authentication for businesses and clients.
