package db

import (
	"log"

	"backend/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() (*gorm.DB, error) {
	dsn := "root:@tcp(127.0.0.1:3306)/website_praktikum?charset=utf8mb4&parseTime=True&loc=Local"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Println("DB connect error:", err)
		return nil, err
	}

	db.AutoMigrate(&models.TP{})

	DB = db
	return DB, nil
}
