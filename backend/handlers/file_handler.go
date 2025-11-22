package handlers

import (
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func ServePDF(c *gin.Context) {
	filename := c.Query("name")
	if filename == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name parameter required"})
		return
	}

	path := filepath.Join("dummy", filename)
	c.File(path)
}
