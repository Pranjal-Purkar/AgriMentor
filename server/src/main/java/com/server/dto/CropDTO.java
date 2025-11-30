package com.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CropDTO {
    private String name;              // Example: "Wheat"

    private String category;          // Example: "Cereal", "Vegetable", "Fruit"

    private String type;              // Example: "Rabi", "Kharif", "Zaid" (optional)

    private String description;
}
