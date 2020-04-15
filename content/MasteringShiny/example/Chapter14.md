---
date: "2020-03-27T00:00:00+01:00"
draft: false
linktitle: Chapter 14
menu:
  example:
    weight: 14
title: Chapter 14
toc: true
type: docs
weight: 14
---
  
# 14.6.1 TODO
  
The following app plots user selected variables from the `msleep` dataset for three different types of mammals (carnivores, omnivores, and herbivores), with one tab for each type of mammal. Remove the redundancy in the `selectInput()` definitions with the use of functions

```{r, eval=FALSE}
library(tidyverse)

ui <- fluidPage(
  selectInput(inputId = "x",
              label = "X-axis:",
              choices = c("sleep_total", "sleep_rem", "sleep_cycle", 
                          "awake", "brainwt", "bodywt"),
              selected = "sleep_rem"),
  selectInput(inputId = "y",
              label = "Y-axis:",
              choices = c("sleep_total", "sleep_rem", "sleep_cycle", 
                          "awake", "brainwt", "bodywt"),
              selected = "sleep_total"),
  tabsetPanel(id = "vore",
              tabPanel("Carnivore",
                       plotOutput("plot_carni")),
              tabPanel("Omnivore",
                       plotOutput("plot_omni")),
              tabPanel("Herbivore",
                       plotOutput("plot_herbi")))
)

server <- function(input, output, session) {

  # make subsets
  carni <- reactive( filter(msleep, vore == "carni") )
  omni  <- reactive( filter(msleep, vore == "omni")  )
  herbi <- reactive( filter(msleep, vore == "herbi") )

  # make plots
  output$plot_carni <- renderPlot({
    ggplot(data = carni(), aes_string(x = input$x, y = input$y)) +
      geom_point()
  })
  output$plot_omni <- renderPlot({
    ggplot(data = omni(), aes_string(x = input$x, y = input$y)) +
      geom_point()
  })
  output$plot_herbi <- renderPlot({
    ggplot(data = herbi(), aes_string(x = input$x, y = input$y)) +
      geom_point()
  })

}

shinyApp(ui = ui, server = server)
```


# 14.6.2 TODO

Continue working with the same app from the previous exercise, and further remove redundancy in the code by modularizing how subsets and plots are created.

# 14.6.3 TODO

Suppose you have an app that is slow to launch when a user visits it. Can
modularizing your app code help solve this problem? Explain your reasoning.

# 14.6.4 TODO

Example passing `input$foo` to reactive and it not working.

# 14.6.5 TODO

The following module input provides a text control that lets you type a date in ISO8601 format (yyyy-mm-dd). Complete the module by providing a server function that uses the “error” output to display a message if the entered value is not a valid date. You can use `strptime(x, "%Y-%m-%d")` to parse the string; it will return `NA` if the value isn’t a valid date.

```{r, eval=FALSE}
ymdDateInput <- function(id, label) {
  label <- paste0(label, " (yyyy-mm-dd)")

  fluidRow(
    textInput(NS(id, "date"), label),
    textOutput(NS(id, "error"))
  )
}
```

# 14.6.6 TODO

Rewrite `selectVarServer()` so that both `data` and `filter` are reactive. Pair it with a app function that lets the user pick the `dataset` with the dataset module, a function with an `inputSelect()` that lets the user filter for numeric, character, or factor variables.


# 14.6.7 TODO

The following code defines output and server components of a module that takes a numeric input and produces a bulleted list of three summary statistics. Create an app function that allows you to experiment with it. The app function should take a data frame as input, and use `numericVarSelectInput()` to pick the variable to summarise.

```{r}
summaryOuput <- function(id) {
  tags$ul(
    tags$li("Min: ", textOutput(NS(id, "min"), inline = TRUE)),
    tags$li("Max: ", textOutput(NS(id, "max"), inline = TRUE)),
    tags$li("Missing: ", textOutput(NS(id, "n_na"), inline = TRUE))
  )
}

summaryServer <- function(id, var) {
  moduleServer(id, function(input, output, session) {
    rng <- reactive({
      req(var())
      range(var(), na.rm = TRUE)
    })

    output$min <- renderText(rng()[[1]])
    output$max <- renderText(rng()[[2]])
    output$n_na <- renderText(sum(is.na(var())))
  })
}
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

tt {
  background-color: #bed3ec;
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

.note {
    padding: 1em;
    margin: 1em 0;
    padding-left: 100px;
    background-size: 70px;
    background-repeat: no-repeat;
    background-position: 15px center;
    min-height: 120px;
    color: #1f5386;
    background-color: #cae7c1;
    border: solid 5px #c3dac3;
    font-size: 15px;
  }
  
.note {
  background-image: url("/img/question.png");
}

</style>