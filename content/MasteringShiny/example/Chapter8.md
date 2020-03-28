---
date: "2020-03-27T00:00:00+01:00"
draft: false
linktitle: Chapter 8
menu:
  example:
    weight: 8
title: Chapter 8
toc: true
type: docs
weight: 8
---
  
## 8.1.5.1

Complete the user interface below with a server function that updates input$date so that you can only select dates in input$year.

```{r, eval=FALSE}
ui <- fluidPage(
  numericInput("year", "year", value = 2020),
  dateInput("date", "date")
)
```

## 8.1.5.2

Complete the user interface below with a server function that updates `input$county` choices based on `input$state`. For an added challenge, also change the label from “County” to “Parrish” for Louisana and “Borrough” for “Alaska”.

```{r, eval=FALSE}
library(openintro)
states <- unique(county$state)

ui <- fluidPage(
  selectInput("state", "State", choices = states),
  selectInput("county", "County", choices = NULL)
)
```

## 8.1.5.3

Complete the user interface below with a server function that updates input$country choices based on the input$continent. Use output$data to display all matching rows.

```{r, eval=FALSE}
library(gapminder)
continents <- unique(gapminder$continent)

ui <- fluidPage(
  selectInput("continent", "Continent", choices = continents), 
  selectInput("country", "Country", choices = NULL),
  tableOutput("data")
)
```

## 8.1.5.4

Extend the previous app so that you can also choose to select no continent, and hence see all countries. You’ll need to add "" to the list of choices, and then handle that specially when filtering.

## 8.1.5.5

What is at the heart of the problem described at https://community.rstudio.com/t/29307?

## 8.4.3.1

Take this very simple app based on the initial example in the chapter:

```{r, eval=FALSE}
ui <- fluidPage(
  selectInput("type", "type", c("slider", "numeric")),
  uiOutput("numeric")
)
server <- function(input, output, session) {
  output$numeric <- renderUI({
    if (input$type == "slider") {
      sliderInput("n", "n", value = 0, min = 0, max = 100)
    } else {
      numericInput("n", "n", value = 0, min = 0, max = 100)  
    }
  })
}
```

How could you instead implement it using dynamic visibility? If you implement dynamic visiblity, how could you keep the values in sync when you change the controls?

```{r, eval=FALSE}
```

## 8.4.3.2

Add support for date and date-time columns `make_ui()` and `filter_var()`.

```{r, eval=FALSE}
```

## 8.4.3.3

(Advanced) If you know the S3 OOP system, consider how you could replace the if blocks in `make_ui()` and `filter_var()` with generic functions.

```{r, eval=FALSE}
```

## 8.4.3.4

(Hard) Make a wizard that allows the user to upload their own dataset. The first page should handle the upload. The second should handle reading it, providing one drop down for each variable that lets the user select the column type. The third page should provide some way to get a summary of the dataset.

```{r, eval=FALSE}
```

<style>
p {
  font-size: 12px;
}

pre {
    background-color: #bed3ec;
    border: solid 5px #dfedff;
    color: #1f5386;
    padding: 5px;
}

code {
  background-color: #bed3ec;
  color: #1f5386;
}

#TableOfContents {
  padding-left: 10px;
}

#TableOfContents li a, .toc-top li a {
    display: block;
    padding: .125rem 1.5rem;
    color: #436E9A;
}

body {
 background-color: #FFFFE0;
}

.docs-sidebar .docs-toc-item.active a, .docs-sidebar .nav>.active:hover>a, .docs-sidebar .nav>.active>a {
    font-weight: 700;
    color: #436E9A;
    background-color: transparent;
}

</style>