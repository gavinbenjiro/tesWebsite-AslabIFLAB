package db

import "backend/models"

func Seed() {
	var count int64
	DB.Model(&models.Assignment{}).Count(&count)

	if count == 0 {
		DB.Create(&models.Assignment{
			Title:   "Tugas Pendahuluan DKA",
			PDFPath: "dummy/tugas1.pdf",
		})
		DB.Create(&models.Assignment{
			Title:   "Tugas Pendahuluan PBO",
			PDFPath: "dummy/tugas2.pdf",
		})
		DB.Create(&models.Assignment{
			Title:   "Tugas Pendahuluan JARKOM",
			PDFPath: "dummy/tugas3.pdf",
		})
	}
}
