---
id: "my-id"
---
@import "my-style.less"

# Your Anime List
Your Anime List is a personal app meant to be a simple way to keep track of your own anime watch list. It uses https://jikan.moe/, the unoffical open-source api for MyAnimeList.

## Current Features

- Add/Remove a Series
    - Mark as Watched
- Rate a Series
- Sorting by Demographic Audience

### Add/Remove a Series
Upon launch, the webpage will appear as below.

<img src="images/Your%20Anime%20List%20Home%20Screen.png" width=450px>


<br>
<br>


1. Begin by searching for an anime using the search form
<br>

<img src="images/Add Series.png" width ="450px">


<br>
<br>

2. Click the "Add Series" button on the desired series card
<br>
3.Select the "Your List" tab in the upper left corner
<br>
<img src = 'images/Your List.png'>
<br>
You have added a series to Your Anime List
<br>
<img src = 'images/Your Anime List.png' width = '450px'>


##### Mark a Series as Watched

1. Select the Finish Series button
    The series card will be grayed out and pushed to the bottom of the watch list.
<img src = 'images/Watched Series.png' width = "450px">

<br>

### Rate a Series
1. Select the corresponding star for your rating. The rating will be displayed on the card
<img src = 'images/Rate Series.png' width = '450px'>

<br>

### Sort by Demographic Audience
1. Using the options tab, select what demographic you want to view
<br>
<img src = 'images/Demographic Example.png' width = '450px'>
<br>
2. Only the series with the respecitve demographic will be shown.
*The filter will apply to both the search results and your personal series list
**At this time, series without a demographic attribute listed are also removed

<br>
<img src = 'images/Demographic Sorted.png' width = '450 px'>

# Future Additions
On this version, Your Anime List is a simple watch list application. Some kinks including handling missing demographic attributes, could be addressed in future updates. Future additional features could include allowing users to edit series descriptions in their own words, allowing users to add series not found on the api, and incorporating use of a json-server to allow for maintenance of the list.