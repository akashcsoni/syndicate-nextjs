// 📁 utils/strapiApi.js
import axios from "axios";
import themeConfig, { BACKEND_URL } from "@/config/themeConfig";

export const $api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${themeConfig.apiToken}`,
  },
});

/**
 * Fetches a Strapi page component by slug
 * @param {string} slug - Slug of the page to fetch
 * @returns {Promise<any>} - Page data from Strapi
 */

// For Post Api

export async function fetchStrapiPage(url, body) {
  try {
    const response = await $api.post(url, body);

    return response?.data;
  } catch (error) {
    console.error(`Error fetching page with body`, body, error);
    throw error;
  }
}

// For Get Api

// export async function getData(url) {
//   try {
//     const response = await $api.get(url);
//     return response?.data;
//   } catch (error) {
//     console.error(`Error fetching page for slug "${url}"`, error);
//     throw error;
//   }
// }

export async function getData(url, params = {}) {
  try {
    const response = await $api.get(url, { params });
    return response?.data;
  } catch (error) {
    return null;
  }
}
