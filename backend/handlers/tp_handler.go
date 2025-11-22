package handlers

import (
	"net/http"

	"backend/db"
	"backend/models"

	"github.com/gin-gonic/gin"
)

func GetSubmissions(c *gin.Context) {
	var list []models.TP
	db.DB.Find(&list)
	c.JSON(http.StatusOK, list)
}

func GetSubmissionByID(c *gin.Context) {
	id := c.Param("id")
	var s models.TP

	if err := db.DB.First(&s, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Submission not found"})
		return
	}

	c.JSON(http.StatusOK, s)
}

func CreateSubmission(c *gin.Context) {
	var input struct {
		Title string `json:"title"`
		SubTitle string `json:"subtitle"`
		Date string `json:"date"`
		Deadline string `json:"deadline"`
		Category string `json:"category"`
		Description string `json:"description"`
	}

	if err := c.BindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	task := models.TP{
		Title: input.Title,
		SubTitle: input.SubTitle,
		Date: input.Date,
		Deadline: input.Deadline,
		Category: input.Category,
		Description: input.Description,
	}

	if err := db.DB.Create(&task).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to create submission"})
		return
	}

	c.JSON(201, task)
}

func UpdateSubmission(c *gin.Context) {
	id := c.Param("id")

	var task models.TP
	if err := db.DB.First(&task, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Submission not found"})
		return
	}

	var input struct {
		Title *string `json:"title"`
		SubTitle *string `json:"subtitle"`
		Date *string `json:"date"`
		Deadline *string `json:"deadline"`
		Category *string `json:"category"`
		Description *string `json:"description"`
	}

	if err := c.BindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	if input.Title != nil {
		task.Title = *input.Title
	}
	if input.SubTitle != nil {
		task.SubTitle = *input.SubTitle
	}
	if input.Date != nil {
		task.Date = *input.Date
	}
	if input.Deadline != nil {
		task.Deadline = *input.Deadline
	}
	if input.Category != nil {
		task.Category = *input.Category
	}
	if input.Description != nil {
		task.Description = *input.Description
	}

	db.DB.Save(&task)

	c.JSON(200, task)
}

func DeleteSubmission(c *gin.Context) {
	id := c.Param("id")

	if err := db.DB.Delete(&models.TP{}, id).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to delete submission"})
		return
	}

	c.JSON(200, gin.H{"message": "Submission deleted"})
}

