package handlers

import (
	"net/http"

	"backend/db"
	"backend/models"

	"github.com/gin-gonic/gin"
)

func GetAssignments(c *gin.Context) {
	var list []models.Assignment
	db.DB.Find(&list)
	c.JSON(http.StatusOK, list)
}

func GetAssignmentByID(c *gin.Context) {
	id := c.Param("id")
	var a models.Assignment

	if err := db.DB.First(&a, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Assignment not found"})
		return
	}

	c.JSON(http.StatusOK, a)
}
