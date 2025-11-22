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
	
	r.GET("/soaltugas", handlers.GetSubmissions)
	r.GET("/soaltugas/:id", handlers.GetSubmissionByID)
	r.POST("/soaltugas", handlers.CreateSubmission)
	r.PATCH("/soaltugas/:id", handlers.UpdateSubmission)
	r.DELETE("/soaltugas/:id", handlers.DeleteSubmission)

	log.Println("Server running at :8080")
	r.Run(":8080")
}
