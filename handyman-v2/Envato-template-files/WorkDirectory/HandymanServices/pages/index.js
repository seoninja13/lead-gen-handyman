import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * Home Page - Redirects to the Handyman Services home page
 *
 * This page redirects to the handyman services home page while preserving
 * the MCP testing functionality at /mcp-test
 */
const HomePage = () => {
  return null;
};

/**
 * Function to test Supabase MCP server
 */
const testSupabaseMCP = async () => {
  try {
    // SQL query to list all tables in the public schema
    const query = "SELECT tablename FROM pg_tables WHERE schemaname = 'public';";

    // Make a direct request to the MCP server
    const response = await fetch('http://localhost:8888/mcp3_execute_postgresql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('Supabase MCP Response:', data);
    alert('Check console for Supabase MCP response');
  } catch (error) {
    console.error('Error testing Supabase MCP:', error);
    alert(`Error: ${error.message}`);
  }
};

/**
 * Function to test Google Maps MCP server
 */
const testGoogleMapsMCP = async () => {
  try {
    // Make a geocoding request
    const response = await fetch('http://localhost:8888/mcp0_maps_geocode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address: 'Sacramento, CA' })
    });

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('Google Maps MCP Response:', data);
    alert('Check console for Google Maps MCP response');
  } catch (error) {
    console.error('Error testing Google Maps MCP:', error);
    alert(`Error: ${error.message}`);
  }
};

/**
 * Function to test Perplexity MCP server
 */
const testPerplexityMCP = async () => {
  try {
    // Make a search request
    const response = await fetch('http://localhost:8888/mcp2_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: 'handyman services in Sacramento' })
    });

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('Perplexity MCP Response:', data);
    alert('Check console for Perplexity MCP response');
  } catch (error) {
    console.error('Error testing Perplexity MCP:', error);
    alert(`Error: ${error.message}`);
  }
};

/**
 * Function to test OpenAI MCP server
 */
const testOpenAIMCP = async () => {
  try {
    // Make a chat completion request
    const response = await fetch('http://localhost:8888/mcp1_openai_chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for a handyman service business.' },
          { role: 'user', content: 'Write a short description for a handyman service business.' }
        ]
      })
    });

    // Parse the response
    const data = await response.json();

    // Display the result
    console.log('OpenAI MCP Response:', data);
    alert('Check console for OpenAI MCP response');
  } catch (error) {
    console.error('Error testing OpenAI MCP:', error);
    alert(`Error: ${error.message}`);
  }
};

export default HomePage;

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/home',
      permanent: false,
    },
  };
}
