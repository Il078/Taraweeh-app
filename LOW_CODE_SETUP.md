# Taraweeh App: No-Code Setup Guide

This guide helps you set up a fully functional Taraweeh Recitations app using Airtable (for data) and Softr (for the frontend) - no coding required!

## Step 1: Set Up Airtable

1. **Create an Airtable account** at [airtable.com](https://airtable.com) (free tier works fine)

2. **Create a new base** called "TaraweehApp"

3. **Create a table** called "Tracks" with these fields:
   - `id` (Number)
   - `section` (Single Select: "makkah", "madinah")
   - `year` (Number)
   - `surah_id` (Number)
   - `surah_name` (Text)
   - `audio_url` (URL)
   - `night` (Number)

4. **Populate with data** using one of these methods:
   - Run our script: `node airtable-setup.js` (after adding your API key)
   - Or manually add ~10 sample records for testing

5. **Create a second table** called "Years" with these fields:
   - `year` (Number, 1426-1442)
   - `section` (Single Select: "makkah", "madinah")
   - Populate this with all year-section combinations (34 records total)

## Step 2: Set Up Softr

1. **Create a Softr account** at [softr.io](https://www.softr.io/) (free plan works for testing)

2. **Create a new project** with a blank template

3. **Connect to Airtable**:
   - Go to Settings → Integrations → Airtable
   - Connect your Airtable account
   - Select the TaraweehApp base

4. **Create the home page**:
   - Add a "Grid" block
   - Data source: Years table
   - Group by: none
   - Display: Card view with Year and Section
   - Set up filtering to sort by Section, then Year

5. **Create the details page**:
   - Add a new page with path `/[section]/[year]`
   - Add "List" block
   - Data source: Tracks table
   - Filter by: section and year matching the URL parameters
   - Add an Audio Player block for each track

6. **Customize the design**:
   - Add your header with "Taraweeh Recitations Archive"
   - Apply custom colors (green header, etc.)
   - Add footer with "Audio courtesy of QuranicAudio.com"

## Step 3: Launch Your App

1. **Test thoroughly**:
   - Check grid layout on home page
   - Verify all links work and go to correct years
   - Test audio playback (mock URLs won't play but should show player)

2. **Publish your site**:
   - Click "Publish" in Softr
   - Your app is now live at your Softr subdomain!

3. **Optional: Connect custom domain**:
   - In Softr settings → Custom Domain
   - Follow instructions to connect your domain

## Replacing Mock Data with Real Data

Once the QuranicAudio API becomes available:

1. Modify the `airtable-setup.js` script to pull from the real API
2. Re-run the script to update your Airtable with real audio URLs
3. Your Softr site will automatically update with the real data!

---

For any questions or issues, please contact us at support@example.com 