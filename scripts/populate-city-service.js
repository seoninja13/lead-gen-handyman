var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// @ts-nocheck
var _a = require('openai'), Configuration = _a.Configuration, OpenAIApi = _a.OpenAIApi;
var createClient = require('@/utils/supabase/server').createClient;
(function () { return __awaiter(_this, void 0, void 0, function () {
    // Function to generate SEO content using ChatGPT 3.5 Turbo
    function generateSeoContent(city, service) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt_1, completion, text, lines, seo_title, seo_description, seo_h1, main_content, features_content, benefits_content, service_area_content, faq_content, testimonials, structured_data, service_city_ca, error_1;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        _m.trys.push([0, 2, , 3]);
                        prompt_1 = "Generate the following content for a page about ".concat(service, " in ").concat(city, ":\n\n  - SEO title: A concise and engaging title for the page.\n  - SEO description: An informative description to entice users to click.\n  - SEO H1: A clear and keyword-rich main heading for the page.\n  - Main content: A detailed overview of the service.\n  - Features content: Key features of the service.\n  - Benefits content: Benefits of using the service.\n  - Service area content: A description of the area where the service is offered.\n  - FAQ content: Frequently asked questions about the service (in JSON format).\n  - Testimonials: Positive reviews from satisfied customers (in JSON format).\n  - Structured data: JSON-LD schema data for the service.\n  - Service City CA: Information about the service specific to California.\n\n  Please provide the FAQ content and Testimonials in JSON format.");
                        return [4 /*yield*/, openai.createChatCompletion({
                                model: "gpt-3.5-turbo",
                                messages: [{ role: "user", content: prompt_1 }],
                                max_tokens: 2000,
                                temperature: 0.7,
                            })];
                    case 1:
                        completion = _m.sent();
                        text = completion.data.choices[0].message.content;
                        lines = text.split("\\n");
                        seo_title = ((_a = lines.find(function (line) { return line.startsWith("SEO title:"); })) === null || _a === void 0 ? void 0 : _a.substring(11).trim()) || "";
                        seo_description = ((_b = lines.find(function (line) { return line.startsWith("SEO description:"); })) === null || _b === void 0 ? void 0 : _b.substring(17).trim()) || "";
                        seo_h1 = ((_c = lines.find(function (line) { return line.startsWith("SEO H1:"); })) === null || _c === void 0 ? void 0 : _c.substring(7).trim()) || "";
                        main_content = ((_d = lines.find(function (line) { return line.startsWith("Main content:"); })) === null || _d === void 0 ? void 0 : _d.substring(13).trim()) || "";
                        features_content = ((_e = lines.find(function (line) { return line.startsWith("Features content:"); })) === null || _e === void 0 ? void 0 : _e.substring(17).trim()) || "";
                        benefits_content = ((_f = lines.find(function (line) { return line.startsWith("Benefits content:"); })) === null || _f === void 0 ? void 0 : _f.substring(17).trim()) || "";
                        service_area_content = ((_g = lines.find(function (line) { return line.startsWith("Service area content:"); })) === null || _g === void 0 ? void 0 : _g.substring(21).trim()) || "";
                        faq_content = JSON.parse(((_h = lines.find(function (line) { return line.startsWith("FAQ content:"); })) === null || _h === void 0 ? void 0 : _h.substring(12).trim()) || "[]");
                        testimonials = JSON.parse(((_j = lines.find(function (line) { return line.startsWith("Testimonials:"); })) === null || _j === void 0 ? void 0 : _j.substring(13).trim()) || "[]");
                        structured_data = ((_k = lines.find(function (line) { return line.startsWith("Structured data:"); })) === null || _k === void 0 ? void 0 : _k.substring(16).trim()) || "";
                        service_city_ca = ((_l = lines.find(function (line) { return line.startsWith("Service City CA:"); })) === null || _l === void 0 ? void 0 : _l.substring(17).trim()) || "";
                        return [2 /*return*/, { seo_title: seo_title, seo_description: seo_description, seo_h1: seo_h1, main_content: main_content, features_content: features_content, benefits_content: benefits_content, service_area_content: service_area_content, faq_content: faq_content, testimonials: testimonials, structured_data: structured_data, service_city_ca: service_city_ca }];
                    case 2:
                        error_1 = _m.sent();
                        console.error("Error generating SEO content:", error_1);
                        return [2 /*return*/, { seo_title: "", seo_description: "", seo_h1: "", main_content: "", features_content: "", benefits_content: "", service_area_content: "", faq_content: "", testimonials: "", structured_data: "", service_city_ca: "" }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    // Function to update the city_service table
    function populateCityService() {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cityServices, error, _i, cityServices_1, cityService, city, service, seoContent, updateError, error_2;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, supabase
                                .from('city_services')
                                .select("\n          id,\n          city_id,\n          service_id,\n          cities (name, slug),\n          services (name)\n        ")];
                    case 1:
                        _a = _d.sent(), cityServices = _a.data, error = _a.error;
                        if (error) {
                            throw new Error("Error fetching city services: ".concat(error.message));
                        }
                        if (!cityServices) {
                            console.log("No city services found.");
                            return [2 /*return*/];
                        }
                        _i = 0, cityServices_1 = cityServices;
                        _d.label = 2;
                    case 2:
                        if (!(_i < cityServices_1.length)) return [3 /*break*/, 7];
                        cityService = cityServices_1[_i];
                        if (cityService.seo_title && cityService.seo_description && cityService.seo_h1 && cityService.main_content && cityService.features_content && cityService.benefits_content && cityService.service_area_content && cityService.faq_content && cityService.testimonials && cityService.structured_data) {
                            console.log("City service ".concat(cityService.id, " already has SEO content. Skipping..."));
                            return [3 /*break*/, 6];
                        }
                        city = (_b = cityService.cities) === null || _b === void 0 ? void 0 : _b.name;
                        service = (_c = cityService.services) === null || _c === void 0 ? void 0 : _c.name;
                        if (!city || !service) {
                            console.warn("Could not extract city or service name for city service ".concat(cityService.id, ". Skipping..."));
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, generateSeoContent(city, service)];
                    case 3:
                        seoContent = _d.sent();
                        return [4 /*yield*/, supabase
                                .from('city_services')
                                .update({
                                seo_title: seoContent.seo_title,
                                seo_description: seoContent.seo_description,
                                seo_h1: seoContent.seo_h1,
                                main_content: seoContent.main_content,
                                features_content: seoContent.features_content,
                                benefits_content: seoContent.benefits_content,
                                service_area_content: seoContent.service_area_content,
                                faq_content: seoContent.faq_content,
                                testimonials: seoContent.testimonials,
                                structured_data: seoContent.structured_data,
                                service_city_ca: seoContent.service_city_ca,
                            })
                                .eq('id', cityService.id)];
                    case 4:
                        updateError = (_d.sent()).error;
                        if (updateError) {
                            console.error("Error updating city service ".concat(cityService.id, ": ").concat(updateError.message));
                        }
                        else {
                            console.log("Successfully updated city service ".concat(cityService.id));
                        }
                        // Add a timeout between queries to avoid getting locked out
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 5:
                        // Add a timeout between queries to avoid getting locked out
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7:
                        console.log("Finished populating city service table.");
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _d.sent();
                        console.error("An error occurred: ".concat(error_2));
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    var supabase, configuration, openai;
    return __generator(this, function (_a) {
        supabase = createClient();
        configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        openai = new OpenAIApi(configuration);
        // Initialize Supabase client
        populateCityService();
        return [2 /*return*/];
    });
}); })();
