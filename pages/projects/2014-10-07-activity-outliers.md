---
layout: post
title: Activity Outliers - Where do Pros really work?
description: Project Outlier detection using geohash-binning and density estimation.   
category: "DataScience"
tags: [geospatial, statistics, data science]
author: Mulloy Morrow
---

Each of our Porch Pro's has potentially hundreds of thousands of projects associated with them. However, only a subset of which may be relevant. Most professionals will exhibit a *service area*, characterized by a high-density of localized projects. This service area varies, depending on the *type* of professional we are examining and proximity to markets, e.g. architect vs plumber. However, a naïve rule of thumb definition is to draw a circle around a professional's location using a 30-minute-drive to calculate the radius. This approach is suceptible to numerous possible oddities and missing-information found in data. We'll summarize how we solve real-world problems like this here at Porch to yield a great end-user experience. 

The 30-minute driving radius is a suitable heuristic for a minority of professionals with clean data located in an accessible urban center (see below). On a rare occasion, this professional may do work outside of Indiannapolis. However, their services are typically confined to the local urban center due to costs of doing business elsewhere, such as driving time or business competition: 

<iframe width="500" height="300" scrolling="no" frameborder="no" src="https://www.google.com/fusiontables/embedviz?q=select+col2+from+1m9rscnaoszQ73dmxYmnA2a-8gxn19B8V2Bh63tHG&amp;viz=MAP&amp;h=false&amp;lat=39.774382675447086&amp;lng=-85.291822421875&amp;t=1&amp;z=7&amp;l=col2&amp;y=2&amp;tmplt=2&amp;hml=GEOCODABLE"></iframe> 
**(above) Green arrow is the professional's location. Green dots are designated inliers. Red dots are designated outliers.**


This approach presumes we know the starting location of our professional. This assumption often breaks down due to the nature of data sometimes coming from dirty sources. For example, the following professional has a mixture of clean and dirty data. The first surprise is their location. Raw data suggests they are located at LatLon (0.0,0.0), green arrow off west coast of Africa on the Equator. However, their project data clearly suggests otherwise. Zooming in, they exhibit a typical project density distribution in South Carolina. By removing our dependency on their location and defining service area solely on this density, we uncover a much more robust method of defining a service area and can identify, at scale, inlier/outlier data, including the professional's location. 

<iframe width="500" height="300" scrolling="no" frameborder="no" src="https://www.google.com/fusiontables/embedviz?q=select+col2+from+1SlwNZv4hsppO-KUrDH0osSsNMJbxok16J3FQWypY&amp;viz=MAP&amp;h=false&amp;lat=26.64456216460632&amp;lng=-36.65332440625002&amp;t=1&amp;z=2&amp;l=col2&amp;y=2&amp;tmplt=2&amp;hml=GEOCODABLE"></iframe>


Porch has a unique collection of data that has never before been successfully pulled together into a single data-model. Furtheremore, it is quite costly to call up millions of people and ask them for their correct company location. Therefore, our solutions must be robust in the presence of dirty data and missing information. 

By characterizing service areas by density-distributions rather than with a radial search, we are also able to discover disjoint sets of dense service areas (see below).


<iframe width="500" height="300" scrolling="no" frameborder="no" src="https://www.google.com/fusiontables/embedviz?q=select+col2+from+1s5-zYK_X2BpXmtu0fVupdvZKgoOAQflQs3Ah0j9H&amp;viz=MAP&amp;h=false&amp;lat=37.85653583371676&amp;lng=-83.84446675000004&amp;t=1&amp;z=6&amp;l=col2&amp;y=2&amp;tmplt=2&amp;hml=GEOCODABLE"></iframe>

