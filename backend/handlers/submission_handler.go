package handlers

import (
	"net/http"

	"backend/db"
	"backend/models"

	"github.com/gin-gonic/gin"
)

func GetSubmissions(c *gin.Context) {
	var list []models.Submission
	db.DB.Find(&list)
	c.JSON(http.StatusOK, list)
}

func GetSubmissionByID(c *gin.Context) {
	id := c.Param("id")
	var s models.Submission

	if err := db.DB.First(&s, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Submission not found"})
		return
	}

	c.JSON(http.StatusOK, s)
}

func CreateSubmission(c *gin.Context) {
	var input struct {
		AssignmentID uint   `json:"assignment_id"`
		StudentName  string `json:"student_name"`
		FilePath     string `json:"file_path"`
		Description  string `json:"description"`
	}

	if err := c.BindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	sub := models.Submission{
		AssignmentID: input.AssignmentID,
		StudentName:  input.StudentName,
		FilePath:     input.FilePath,
		Status:       "Submitted",
		Grade:        "-",
		Description:  input.Description,
	}

	if err := db.DB.Create(&sub).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to create submission"})
		return
	}

	c.JSON(201, sub)
}

func UpdateSubmission(c *gin.Context) {
	id := c.Param("id")

	var sub models.Submission
	if err := db.DB.First(&sub, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Submission not found"})
		return
	}

	var input struct {
		Grade  *string `json:"grade"`
		Status *string `json:"status"`
		Description    *string `json:"description"`
	}

	if err := c.BindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	if input.Grade != nil {
		sub.Grade = *input.Grade
	}
	if input.Status != nil {
		sub.Status = *input.Status
	}
	if input.Description != nil {
		sub.Description = *input.Description
	}

	db.DB.Save(&sub)

	c.JSON(200, sub)
}

func DeleteSubmission(c *gin.Context) {
	id := c.Param("id")

	if err := db.DB.Delete(&models.Submission{}, id).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to delete submission"})
		return
	}

	c.JSON(200, gin.H{"message": "Submission deleted"})
}

