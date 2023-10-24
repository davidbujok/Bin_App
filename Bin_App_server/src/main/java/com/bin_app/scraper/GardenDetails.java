package com.bin_app.scraper;public class GardenDetails {

    private String gardenWasteId;
    private String gardenWasteUrl;

    public GardenDetails(String gardenWasteId, String gardenWasteUrl) {
        this.gardenWasteId = gardenWasteId;
        this.gardenWasteUrl = gardenWasteUrl;
    }

    public String getGardenWasteId() {
        return gardenWasteId;
    }

    public String getGardenWasteUrl() {
        return gardenWasteUrl;
    }

    public void setGardenWasteId(String gardenWasteId) {
        this.gardenWasteId = gardenWasteId;
    }

    public void setGardenWasteUrl(String gardenWasteUrl) {
        this.gardenWasteUrl = gardenWasteUrl;
    }

    public void setFullUrl(String url) {
        setGardenWasteUrl(url);
    }
}
