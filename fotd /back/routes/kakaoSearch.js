const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const { Store } = require('../models/'); // 모델의 경로를 수정해야 합니다.

router.post('/search', async (req, res) => {
    const searchKeyword = req.body.searchKeyword;

    const searchUrl = `https://map.kakao.com/?q=${encodeURIComponent(searchKeyword)}`;
    try {
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);

        const searchResults = [];
        $('.PlaceItem').each((index, element) => {
            const name = $(element).find('.PlaceItem-title').text().trim();
            const address = $(element).find('.PlaceItem-address').text().trim();
            /*
            const dataLat = $(element).attr('data-lat');
            const dataLng = $(element).attr('data-lng');
            const latitude = parseFloat(dataLat);
            const longitude = parseFloat(dataLng);*/
            const lat = parseFloat($(element).attr('data-latitude')); // 위도 추출
            const lng = parseFloat($(element).attr('data-longitude')); // 경도 추출


            if (name && address && !isNaN(lat) && !isNaN(lng)) {
                searchResults.push({ name, address, lat, lng });
            }
        });

        await Store.bulkCreate(searchResults);
        console.log('검색 결과 저장 완료');
        res.status(200).json({ message: '검색 결과 저장 완료' });
    } catch (error) {
        console.error('스크랩핑 및 저장 에러:', error);
        res.status(500).json({ message: '스크랩핑 및 저장 에러' });
    }
});

module.exports = router;
