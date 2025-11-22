package main

import (
	"log"

	"backend/db"
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	_, err := db.Connect()
	if err != nil {
		log.Fatal("DB connection failed:", err)
	}

	db.Seed()

	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})
	
	r.GET("/assignments", handlers.GetAssignments)
	r.GET("/assignments/:id", handlers.GetAssignmentByID)
	r.GET("/submissions", handlers.GetSubmissions)
	r.GET("/submissions/:id", handlers.GetSubmissionByID)
	r.GET("/file", handlers.ServePDF)
	r.POST("/submissions", handlers.CreateSubmission)
	r.PATCH("/submissions/:id", handlers.UpdateSubmission)
	r.DELETE("/submissions/:id", handlers.DeleteSubmission)

	log.Println("Server running at :8080")
	r.Run(":8080")
}
