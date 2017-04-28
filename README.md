# jQuery Tabs plugin
Use this plugin on to display your content in clickable tabs.
Example: http://www.travellink.se/turistbyraer/malaysia#malaysia-tabs-container

## Setup
Include CSS file and JS file
```html
<!-- Load CSS -->
<link rel="stylesheet" href="/css/jquery-tabs-plugin.css" type="text/css">
<!-- Load plugin -->
<script type="text/javascript" src="/js/jquery-tabs-plugin.js"></script>
```

Format your `html` like below:
```html
<div class="jquery-plugin-container">
  <div id="uniqueId">
    <ul>
      <li data-nav-headline="Shorter Headline">
        <h3>Tab 1</h3>
        <img src="">
        <p>Tab 1 content</p>
        <p class="rightLink"><a href="">För mer information &raquo;</a></p>
      </li>
      <li>
        <h3>Tab 2</h3>
        <img src="">
        <p>Tab 2 content</p>
        <p class="rightLink"><a href="">För mer information &raquo;</a></p>
      </li>
    </ul>
  </div>
</div>
```

Activate the plugin:
```javascript
$(document).ready(function(e) {
  $("#uniqueId").jQueryTabsPlugin();
});
```

