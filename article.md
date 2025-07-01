---
jupyter:
  jupytext:
    formats: ipynb,md
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.3'
      jupytext_version: 1.17.2
  kernelspec:
    display_name: Python 3 (ipykernel)
    language: python
    name: python3
---

<!-- #region citation-manager={"citations": {"": []}} tags=["title"] -->
# Interactive panels as explorative tools of visual sources: continuing Warburg’s epistemological principles
<!-- #endregion -->

<!-- #region tags=["contributor"] -->
 ### Sergio Rodríguez Gómez [![orcid](https://orcid.org/sites/default/files/images/orcid_16x16.png)](https://orcid.org/0000-0002-1631-4747)
Universidad de los Andes
<!-- #endregion -->

<!-- #region tags=["contributor"] -->
### Juan Felipe Urueña Calderón [![orcid](https://orcid.org/sites/default/files/images/orcid_16x16.png)](https://orcid.org/0000-0003-0576-159X)
Universidad Pedagógica Nacional

<!-- #endregion -->

<!-- #region tags=["copyright"] -->
[![cc-by](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)
© Sergio Rodríguez Gómez - Juan Felipe Urueña Calderón. Published by De Gruyter in cooperation with the University of Luxembourg Centre for Contemporary and Digital History. This is an Open Access article distributed under the terms of the [Creative Commons Attribution License CC-BY](https://creativecommons.org/licenses/by/4.0/)

<!-- #endregion -->

```python tags=["cover"]
from IPython.display import Image, display

display(Image("./media/cover.jpg"))
```

<!-- #region tags=["keywords"] -->
Aby Warburg, digital humanities, visual studies, digital art history, cultural history, data visualisation
<!-- #endregion -->

<!-- #region tags=["abstract"] -->
This article presents a method and a tool for exploring visual collections, drawing on symbolic connections, through the use of data processing and interactive data visualisation. The approach is deeply inspired by the work of Aby Warburg, particularly by his Mnemosyne Atlas project. Building on this foundation, we introduce Aventura.js, an open-source, bilingual JavaScript library developed by one of the authors as a tool to create interactive symbolic panels connected by hypertextual links and interpretations.

Following the structure of the Journal, the article is organised in three complementary layers: the narrative layer of the article presents the context and the epistemological principles originally proposed by Warburg on his Mnemosyne Atlas project at the beginning of the XX century, and also reflects on how to expand Warburg's strategies on new ways by using digital tools. We discuss the necessity of specialised tools to visualise qualitative data in image corpora within the humanities. The hermeneutic layer of the article details the development of Aventura.js as an electronic literature library and its experimental repurposing as a tool for digital visual scholarship. Subsequently, we demonstrate how this programming library can be used to create interactive exploratory panels and atlases that embody and extend the conceptual possibilities of Warburg’s approach. Concretely, these panels and atlases are organised in feature spaces and hypertextual tours derived from persistent visual motifs.

As a case study, we apply our method and tool to a dataset of images related to the *Carguero* (Man carrier), a figure prominent in 19th century Colombian visual culture. This case is drawn from the doctoral dissertation of one of the authors, where the tool was first experimentally employed as a part of a broader research project. We show how focusing attention on symbolic figures or details, rather than authors, works or genres, can offer deeper insights into the trajectories of images across various visual regimes, geographic spaces, and historical periods. This process includes creating a collection, annotating images, filtering, automating montage, presentation and interactivity, and making design decisions for the final interactive atlas. Lastly, we critically evaluate the strength and limitations of this method and tool and possible further developments.
<!-- #endregion -->

## Introduction


This article pursues two interrelated aims: to propose a method for digitally analysing visual sources through symbolic connections, and to demonstrate its application via a case study on the 19th-century Colombian Carguero.


First, we propose a method and a tool, called Aventura.js, to create interactive symbolic atlases, composed of multiple, interlinked panels, inspired by Aby Warburg’s Mnemosyne Atlas project. We argue that interactive atlases can serve as a medium for collecting, exploring, and displaying symbolic interpretations of historical visual sources —revealing networks of symbolic connection between images, that is, persistent visual conventions and derivations. We demonstrate how Aventura.js, a JavaScript library originally intended for the creation of electronic literature, can be repurposed to structure an atlas and render interactive panels, alongside additional data processing and visualisation techniques. In proposing this method, we also address several challenges related to developing tools for studying visuality in the context of digital scholarship in the humanities, including: the balance between computationally and manually extracted data, the impact of linguistic barriers in software development and use, the role of human interpretation into the creation and presentation of historical collections, and the design of interfaces that enable the elaboration of historical arguments.


Second, we present a particular case study and demonstration that applies our proposed method: a visual interactive atlas around the image of the *Carguero* (roughly translated from Spanish as “Man carrier”). Namely, the representation of subalternized people that were used as means of transportation in the harsh geographical accidents of nineteenth-century Colombia and other places in South America. This case study stems from the doctoral dissertation of one of the authors, where the tool was first employed to analyse the visual trajectories of the Carguero across different historical and geographic contexts. We explore how the image of the *Carguero* has been reappropriated, remixed and recontextualized over time. With this visual atlas, we aim to offer a new interpretation of the subject and illustrate how  computational data structures, data visualisation, and hypertext can deepen the reading of visual collections.


This work is the product of an interdisciplinary collaboration, combining expertise in cultural history, visual studies, semiotics, and data visualisation. It is also driven by a shared interest in studying visual sources with the help of computational tools. Our theoretical foundation is rooted in the epistemological principles of Aby Warburg's Mnemosyne Atlas (<cite data-cite="7299034/5SBJCW9X"></cite>). We want to show that Warburg’s insights have potential for the creation of digital tools to interpret visual sources, and offer strategies that address the limitations of conventional publication formats in academia (<cite data-cite="7299034/7IRYBDQE"></cite>) and the orthodox,  methods for data visualisation, usually extrapolated from predominantly quantitative fields and insufficient to represent the categorical and symbolic data that is common in the humanities (<cite data-cite="7299034/779MQTKK"></cite>).


## The conceptual framework of the Mnemosyne Atlas


Aby Warburg’s Mnemosyne Atlas (1924–1929)—an unfinished series of 63 panels featuring over 1,000 images—reimagined art history as a spatial practice. By arranging photographs of artworks, maps, and ephemera on black fabric screens, Warburg sought to visualize the "afterlife" of symbols (<cite data-cite="7299034/5SBJCW9X"></cite>). It was a device that visually stored and displayed central aspects of Western visual memory. In Warburg's words, the Atlas was an instrument of "orientation" which, by exhibiting images and their visual relationships, allowed a researcher to illustrate how expressive values of  "life in motion" from Antiquity were reincorporated in Renaissance art (<cite data-cite="7299034/5SBJCW9X"></cite>, p. 35). Although generally associated with a collection of maps, as Antón-Barco argues, "atlases are a visual form of knowledge consisting on an encyclopedic collection of related objects or entities. Its mission is to offer a multitude of elements brought together by elective affinities so that its reader can understand the world that he or she lives in.” (<cite data-cite="7299034/JS2I4PY3"></cite>, p. 46). In a sense, like the mythological Atlas, Warburg’s Atlas is sought to "carry the world on its back" (<cite data-cite="7299034/4TDN96K2"></cite>). In its final form, the Mnemosyne Atlas consisted of a set of large black fabric screens mounted to frames measuring 1.50 m x 2 m on which different photographs were grouped by attaching them with small, easily manipulated clamps (<cite data-cite="7299034/HY9N8YHZ"></cite>, p. 412). The panels where part of the Atlas consisted of sets of images organized by visual relationships, defined by certain recurring motifs of themes, gestures, and body configurations found in heterogeneous sources, not all of them considered, at the time, by art historians: from images extracted from art history books to advertisement pieces cut out from magazines. All this material was organized in groups and series, according to the links suggested by different visual, historical, and geographical resemblances. In general terms, this procedure could be described as a montage, in analogy to what Sergey Eisenstein or Dziga Vertov were developing at the time in cinema; that is, as an arrangement of elements in space and time in which the union of parts conforms a holistic meaning (<cite data-cite="7299034/HY9N8YHZ"></cite>; <cite data-cite="7299034/UBQT2LZL"></cite>; <cite data-cite="7299034/7IRYBDQE"></cite>).

```python tags=["figure-panel79-*"]
# An example of a panel from Mnemosyne Atlas (panel 79)
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "An example of a panel from Atlas Mnemosyne (panel 79)"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/T79_HD.jpg"), metadata=metadata)
```

The organisational principle behind the Atlas is what Warburg called “good neighbourliness”. This idea is related to the creative exploration of archives and libraries organised by thematic categories by focusing on the proximity of elements, revealing surprising connections.  For instance, Warburg applied this principle in his grand library (<cite data-cite="7299034/9YEQKZLN"></cite>), his home and research place that comprised a massive and constantly increasing collection of books and photographs, meticulously arranged and rearranged. Unlike most libraries, the books were not organised by subject matter, alphabetical or numerical order, but by four categories: Image, Word, Orientation, and Action, each one arranged over one of four floors. The Library's organisation system directed visitors through intersecting topics: from visual image to language, then to religion, science, and philosophy, and finally to the subject matter of history, patterns of behaviour, and actions. Thus, this system encouraged both linear and transversal exploration, allowing for unexpected discoveries.


Good neighbourliness is based on a intertwined relationship between the particular and the general. Among the elements of a collection, relationships are not established by induction or deduction, that is, by absolute or statistical rules, but by an exemplary or paradigmatic logic, in which each element fosters the others according to the meaningful proximity between singular manifestations of the same theme or detail. In other words, it is based on the logical principle of abduction: the creative reasoning that occurs by trying to find patterns with hypothetical, provisional associations (<cite data-cite="7299034/KC6UKUR5"></cite>). Thus, each particular element is linked to others through resemblances and contrasts that imply symbolic connections, allowing for general insights to emerge while maintaining a focus on the specific. Alluding to a process that prefigures the hermeneutic circle, Warburg saw his research as a demonstration that concrete and abstract thinking are not sharply opposed, but rather determine the organic circle of human intellectual capacity. He described this circle as a "dialectic of historical development" (<cite data-cite="7299034/HY9N8YHZ"></cite>, p. 440).


Good neighbourliness designates both a way of organising a library and an investigative practice, suggesting methods for organising and relating elements in a collection (<cite data-cite="7299034/7ZUNAG4T"></cite>). Thus, an investigative practice can emerge from the organising principle. In the context of Warburg’s research, these meaningful links are referred to as *Pathosformel*, or expressive formulas. The concept was formulated explicitly for the first time in the essay on Durero and Italian Antiquity written in 1905 (<cite data-cite="7299034/9QWY62IZ"></cite>, p. 401-408). Pathosformel refers to the expression by visual means of intense emotions, or *Pathos*, which are manifested in gestures or body configurations. These motifs become formulas that, when copied and used as models, are resignified and adapted to new historical and geographical contexts. The circulation of these visual materials in time and space, which Warburg called “survival” (*Nachleben*), operates in a state of latency in which the motifs represented in the images, or Pathosformel, are maintained as they move between periods, epistemic domains, contexts of signification, media, techniques, and places. For Warburg, survival operates through copying procedures that result in dramatic inversions of meaning —in the sense of classical drama: a change in fortune. Each time these motifs come into contact with an artist, a spectator, or a scholar they are "recharged with life" (<cite data-cite="7299034/X8HNX9QH"></cite>, p. 37) and reworked in new contexts. This contact is described by Warburg as a “disturbing experience” (<cite data-cite="7299034/5SBJCW9X"></cite>, p. 33), in which artists, spectators and scholars struggle between surrendering thoughtlessly to the power of the image, or, on the contrary, establishing a reflexive distance (*Denkraum*), and to make comparisons between materials in a working "space" in which different meaningful juxtapositions can be tried out.


Within the frame of reflexive distance, the “interval” (*Zwischenraum*) is one of the central concepts of the Atlas (<cite data-cite="7299034/5SBJCW9X"></cite>, p. 29). That is, the symbolic meaning created not by the qualities of one single image but by its relation to others, a space in-between (<cite data-cite="7299034/4RVPEU3G"></cite>; <cite data-cite="7299034/HY9N8YHZ"></cite>). In fact, Warburg referred to his method as an "iconology of the interval" (<cite data-cite="7299034/J8JLQ6FN"></cite>, p. 237), alluding to a way of understanding images that involved a specific appreciation of how they are related and how they oscillate in a polar space between the "ordering sign" and the "monstrous complex" (<cite data-cite="7299034/J8JLQ6FN"></cite>, p. 236). Such an interval was present in the original panels in the interstices that exposed the black background fabric used to mount the images.


In a context in which the use of photographs and film projectors for teaching and disseminating art history research had not yet become popular, Warburg formed a large collection of photographs of the different sources he was interested in exploring (<cite data-cite="7299034/JMF8UJ4F"></cite>; <cite data-cite="7299034/SIAZ2MX8"></cite>). The photographs were grouped in a series of panels and, on each panel, they were positioned in a way that gave them the same epistemological level, that is, as having the same interpretative value or importance (<cite data-cite="7299034/UBQT2LZL"></cite>, p. 278). Each panel was then re-photographed in order to create a single, homogenised image, and the series of photographs was intended to take the form of a book that was left unfinished.


The Pathosformel can be seen as an analytical category useful for tracing historical connections between images by establishing emotionally charged visual correspondences. Moreover, the Pathosformel category  functions as an interpretative paradigm that has been employed across various disciplines to explore the circulation of visual symbols and other expressive materials, particularly within the context of European art history (<cite data-cite="7299034/D3M78MTT"></cite>). As Colleen Becker (<cite data-cite="7299034/D3M78MTT"></cite>) notes, although the Pathosformel was originally developed to trace visual emotional survivances from Antiquity to  Renaissance, it provides a nuanced interpretative framework that goes beyond traditional models of influence and reception, encouraging scholars to dynamically reframe meanings. This approach even stretches into cross-cultural analyses, particularly as Warburg’s own work compared the paths of ancient symbols across Eastern and Western traditions. In fact, the comparisons made by Warburg himself regarding the paths these ancient symbols took through the East have established a characteristic approach in studies associated with the Warburg Institute—namely, the search for circulations across diverse cultures.


While some interpretations of Pathosformel align with Jungian archetypes, Didi-Huberman cautions us against such simplifications, arguing that Fritz Saxl initiated this interpretative drift, not Warburg (<cite data-cite="7299034/HY9N8YHZ"></cite>, p. 250). Instead, we align with José Emilio Burucúa’s perspective, favouring a historical interpretation that emphasises the traceable transmission through documents and interpretable sources (<cite data-cite="7299034/XB5YY7DC"></cite>). This trajectory-oriented approach contrasts with an archetypal reading that perceives Pathosformeln as universal motifs manifesting across all cultures. Even anthropological readings can resist this ahistorical temptation when framed within a hermeneutically controlled horizon, supported by evidence produced through social scientific methods, as elaborated by Carlo Ginzburg in his concept of morphology (<cite data-cite="7299034/PC3TQEW3"></cite>). In a similar sense, the variable distance (Denkraum) that artists and viewers maintain with images could be interpreted not in a normative way—as a mode to judge, from the researcher’s perspective, how images are interpreted by the actors in relation to their proximity or distance from myth or reason—but rather as a descriptive approach. This allows for an understanding of how contemporaries express their own evaluations of these distances through their own language and modes of expression derived from visual and written sources.


Additionally, it is important to assert that the Mnemosyne Atlas is not merely an iconographic catalogue but a dynamic exploration of symbolic connections. In adopting the term 'symbolic connections' rather than 'iconographic,' we align with Warburg’s emphasis on the affective and transhistorical resonance of motifs (Pathosformeln) rather than static iconographic classifications. Iconography, as defined by Panofsky (<cite data-cite="7299034/9JHGLATT"></cite>), traditionally focuses on identifying and categorizing visual motifs within specific historical contexts. However, our approach seeks to trace how emotionally charged symbols —such as the act of carrying proposed in our case study— transcend fixed iconographic categories, morphing across epochs and media. This aligns with semiotics, where 'symbolic' denotes signs governed by cultural convention rather than resemblance (icon) or causal connection (index) (<cite data-cite="7299034/KC6UKUR5"></cite>). By prioritizing symbolic connections, we avoid reducing images to predetermined iconographic labels and instead highlight their dynamic, often contested meanings as they migrate between contexts.


## Mnemosyne Atlas and digital humanities


Currently, Warburg’s Atlas has served as an inspiration for imagining modes of organisation and arrangement of, and relationships between digital resources of online collections and databases of museums, archives, libraries, and other heritage organisations (<cite data-cite="7299034/RVS8WMLC"></cite>; <cite data-cite="7299034/PQPY36FK"></cite>; <cite data-cite="7299034/2YRPMV94"></cite>). This strategy has elicited reflection about the ways of collecting, safeguarding, interpreting, arranging, and exhibiting visual materials in the digital world (<cite data-cite="7299034/LDB7UQ48"></cite>); in computational analysis, the repetitive nature of  Pathosformeln has oriented the development of algorithms that recognize certain poses or gestures (<cite data-cite="7299034/LZCATTRL"></cite>); and the particular configuration of the panels has been compared to the electronic screen of different current digital devices like computers and smartphones (<cite data-cite="7299034/LDB7UQ48"></cite>). Indeed, the digital screen could be seen as analogous to the fabric panel, a frame that presents and encompasses a selection of images that enables comparative interpretation by proximity.


Adding to these novel readings of the Atlas in the digital world, here we intend to use the substrate of the digital canvas and its pixel array to develop interactive atlases. The copy-pasting affordance of pixels allows putting images together in order to display symbolic relationships between them. The arrangement of pixels, shapes, and images according to "x" and "y" coordinates allows the construction of a feature space (<cite data-cite="7299034/DLYHLH3V"></cite>; <cite data-cite="7299034/FARLPENA"></cite>) in which metadata can be used to organise elements in space. And the conventions of data visualisation allow to structure hierarchical relationships between different categories.  Additionally, the different layouts, or panels, can be organised as scenes that can be navigated along a z-dimension of meaning depth that constructs an hypertextual narrative (<cite data-cite="7299034/XSTGEJL7"></cite>). Under this light, the screen makes possible a digital interval and the development of a homogenised series, in which the potential originally expressed in Warburg's project of, say, navigating between hyperlinks, is realised (<cite data-cite="7299034/MMKZJFIN"></cite>).


After a technical description of the tools used for our proposal, developed in the hermeneutic layer of the article, we will provide a case study example consisting of a collection of images that are related to the figure of the *Carguero* (Man carrier), the depiction of a person carrying another one, by piggy-back or using backpack chairs or other special accessories, working as a means of transportation in difficult geographic paths; a typical character in 19th century Colombian visual culture. This figure could be interpreted as a concrete and localised manifestation of the Pathosformel of carrying something or someone, which overlaps with the theme of the *carguero*—that is, the representation of a character or "social type” whose variations are structured by various details, (gestures and body configurations), which make possible the emotional expression of the tensions inherent to the theme.


The theme of carrying someone or something can be traced back to European iconographic traditions. This can be explored through classification systems like Iconclass or the Warburg Institute database, where one finds similar representations. One example is the allegory of the blind man and the paralytic —present since Antiquity in fables like those of Aesop— which symbolises mutual support. However, the meanings of these representations radically transformed during the period of the Atlantic revolutions. For instance, caricatures that use this theme to mock improbable political alliances, such as the one published by Daumier in Le Charivari in 1834. In this way, the multiple variations of this image of people carrying others or heavy objects in colonial relationships stemming from formal and informal imperial mechanisms all around the world demonstrate a transformation of the early modern allegory’s meaning. These images now reference social tensions and symbolise inversions of meaning related to the new interpretative possibilities brought about by emerging political languages. The visual variations of the Carguero of Colombia (or better, Nueva Granada, the name assigned to the territory at the time) are a concrete manifestation of the transformation in meaning of the act of carrying within the vertical Andean space of the equatorial tropics.


Our approach aligns with the interpretative paradigm of the Pathosformel we described before. The images of the Carguero rely on earlier visual models, which, through repetition, have become formulas laden with emotional intensity. Often, they convey moral judgments to different audiences about the use of humans for practices that are usually carried out by pack animals. The emotions, axiologies, experiences, and expectations embedded in these representations, which can be traced back to different associated textual sources, are specific historical manifestations. They account for a series of transformations related to the emergence of the modern world, such as the circumstances in which the industrial revolution, scientific revolutions, and political revolutions of the Atlantic world manifested themselves in the Latin American region. The ways in which these images are interpreted vary according to how they are situated in specific historical and geographical contexts, as well as in communities of interpretation related to travel literature, costume books, geographical relations, the literature of customs, the local press, and international illustrated press.


The collection of images in our case study was gathered from a wide range of physical and digital repositories and archives, following Warburg's principle of good neighbourliness. That is to say, it is a collection intended to establish meaningful relationships between the neighbouring elements that emerged as the collection was assembled. Each element suggests new possible connections, gradually complicating the understanding of the problem as a whole.


In this process, we confronted the disciplinary barriers that separate the images from their related texts, which are often housed in different collections and annotated and catalogued by professionals from diverse fields. For example, in the *Museo Nacional de Colombia* (National Museum of Colombia), watercolours and loose plates can be found in the art collection, while engravings included in travel books are in custody of the history collection. This is a problem that repeats in most of the repositories visited; different visual materials receive different treatments: when they are in books, the images are ignored, and when the images are exhibited, the books, newspapers, and magazines they come from are ignored. This creates a series of problems in dealing with search strategies through queries and keywords, which adds up to the problem of the myriad of classification systems and keywords when searching through archives in, say, France, the United States, England, or Germany. In addition, in the collection we also included a number of popular reappropriations of the Carguero image that are not held in repositories; we added photographs directly to the collection.


The use of sources from digital and physical archives along with fortuitous findings, we intend to show the developing potential of the inquiry possibilities derived by the good neighbour principle (<cite data-cite="7299034/RVS8WMLC"></cite>; <cite data-cite="7299034/PQPY36FK"></cite>; <cite data-cite="7299034/LDB7UQ48"></cite>). This principle, which initially guided the creation of the collection by establishing meaningful relationships between its individual elements, has also been crucial for the annotation of metadata —or, more aptly, as Johanna  Drucker suggests, “capta” (<cite data-cite="7299034/FWX8FCV7"></cite>).  We constructed such metadata/capta based on hermeneutic categories arising from the emerging relationships between the elements of the collection and the abductive insight of the researchers. Additionally, the tool we propose in this paper will enable the exploration of such metadata, facilitating the emergence of unexplored connections among the elements and allowing for a richer and more complex understanding of the collection. In this way, the circle between the particular and the general, as formulated by Warburg and analogous to the hermeneutic circle, will create a heuristic tool that suggests new ways of relating the researcher to the elements of the collection. For this reason, we find it crucial to emphasise the hermeneutic nature of the process used to annotate our collection and establish the relationships between its elements. This process arises from the acknowledgment of the observer's situated and inherently biased perspective when engaging with the collection's components. We describe our set of images as a hermeneutic collection, explicitly recognizing that the act of collecting is performed by subjects who interrogate the distance and proximity to the objects, and is, therefore, inherently interpretative.


A crucial aspect of this project is the use of digital image formats to homogenise the materials in the collection. Just as Warburg used photographs to epistemologically equalise images of different formats and techniques (<cite data-cite="7299034/UBQT2LZL"></cite>, p. 278), researchers working with digital images keep images in digital formats, such as PNG and JPG, in their folders, organised in different categories. These digital formats homogenise elements from diverse sources enabling comparisons, juxtapositions, and contrasts. However, this homogenization process also reveals discrepancies between archival practices: such as differences in image quality, colour correction, white balance, cropping, etc. As Johanna Drucker has pointed out, these operations involve unavoidable mediations between visual sources and their digital equivalents, which take place even in the cases of natively digital sources, since, between copies, compressions, and format changes, there are always transformations that “embody interpretation” and can affect computational analyses (<cite data-cite="7299034/NZIIPQX3"></cite>, p. 8). The Carguero image collection is composed of photographed or scanned images from physical works such as bookplates, paintings, murals, sculptures, graffiti, stickers, as well as books, magazines, newspapers, loose sheets, paintings, engravings, etc. hosted in different digital repositories in various file formats (JPG, PNG, PDF, etc.). In our project, this myriad of sources is converted to a unifying format to form the collection: JPG images, and proportionally resized to fit the constraints of our interface.


In the first stages of research in preparation for this paper, the images from the Carguero collection were put in relation to each other in intuitive ways, by following practices that tried to emulate Warburg’s montages. One of the first solutions we attempted, in order to adapt Warburg's panels to digital environments, was to create panels with black-fabric-like backgrounds in the image processing software Photoshop, over which we arranged the images according to the spatial relationships suggested by previously constructed categories of analysis. In a second iteration, we used the Aventura.js library, written by one of the authors, to adapt the panels made in Photoshop by defining clickable "areas" on the images, which allowed users to navigate the collection and jump through related panels. After multiple experiments, we improved the library, which was originally created to make interactive fiction and electronic literature, to implement the principles we previously exposed. The new version presented here is an attempt to streamline the process of creating panels with Aventura.js by using a dataset containing a list of categorical metadata about each image, and some predefined data visualisation conventions and helper functions that standardise the ways of organising and presenting the collection. As we will show, we developed a method to partially automate the creation of panels and narrative paths. The hermeneutic layer of this article presents more technical details about such a process.


In summary, in this project, Warburg's montage was adapted to the space of the digital screen. More specifically, to HTML Canvas Elements created inside web browsers. The canvas is organised according to the "x" and "y" Cartesian coordinate system, and the images are spatially distributed according to the relationships of the categories previously defined in the dataset. These arrangements form a feature space (<cite data-cite="7299034/DLYHLH3V"></cite>), or an interval (Zwischenraum) (<cite data-cite="7299034/5SBJCW9X"></cite>), that makes it possible to establish a space for reflection (Denkraum) and to find similarities and differences through comparison. These charts, which we will explore in more detail below, are exported to Aventura.js and organised into scenes and areas that allow the construction of interactive hypertextual narratives. Such heuristic tools have made it possible to indicate routes of analysis, add nuances, reaffirm indications, reformulate hypotheses, and ultimately refine and visualise the categorical apparatus that organised the material and guided the development of the historical narrative.

<!-- #region tags=["hermeneutics"] -->
## Creating interactive panels
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
### Steps, tools and methods
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
Aventura.js is an open-source, bilingual (Spanish/English) JavaScript library originally designed for creating interactive narratives and electronic literature through context-free grammars, Markov chains, and hypertextual decision trees. Its core functionality revolves around structuring "scenes" as interconnected nodes in a graph, where each scene can contain text, images, buttons, or clickable areas that enable non-linear navigation —a feature directly inspired by hypertext fiction. For this project, Aventura.js was repurposed to align with Warburg’s epistemological principles, particularly the Mnemosyne Atlas’s emphasis on spatial montage and symbolic juxtaposition.
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
The library’s scene system was adapted to serve as a framework for organizing digital "panels" analogous to Warburg’s black fabric screens. Each panel in our interactive atlas corresponds to an Aventura.js scene, defined as a JavaScript object containing metadata (e.g., filters for dataset subsets), visualisation types (e.g., scatterplots, treemaps), and hypertextual links to related scenes. For instance, scenes like scatterPeriodoFigura or packRoulin (see code example below) dynamically generate visualisations by filtering the Carguero dataset and rendering them via HTML Canvas, while clickable areas and buttons allow users to traverse narrative paths or "tours" across panels.
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
```JavaScript
// Example scene definition in Aventura.js
"scatterPeriodoFigura": {
  "viz": {"filter": [ ["fecha", "<", 1900], ["otros", "=", "false"] ], "type": "scatter", "x": "periodo", "y": "figura/fondo"},
  "title": "Figure/Background vs. Period",
  "text": "This panel shows shifts in compositional logic...",
  "options": [
    { "btn": "Continue main route", "scene": "pack1750_1810" },
    { "btn": "Detour: 'Quadro del Perú'", "scene": "detour1"}
  ]
}

```
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
The adaptation process involved extending Aventura.js’s native functions to handle dataset filtering and visualisation conventions. Custom helper functions were developed to automate the creation of panels from CSV metadata, enabling researchers to define categorical hierarchies (e.g., periodo > modelo > soporte) and generate circle-packed treemaps or scatterplots without manual coding. This workflow mirrors Warburg’s "good neighbourliness" principle, as the tool dynamically reconfigures panels based on the dataset’s emerging symbolic affinities, rather than static taxonomies.
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
The technical pipeline for building the Carguero atlas involved four stages, all mediated through Aventura.js’s API:
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
1. Dataset Preparation: Images and metadata were homogenized into a CSV table.

2. Dynamic Filtering: Subsets were generated using Aventura.js’s vanilla JavaScript utilities (e.g., array.filter()), enabling researchers to isolate thematic clusters (e.g., "Roulin-derived images post-1819").

3. Visualisation Rendering: Custom code leveraged HTML Canvas to render scatterplots and treemaps directly in the browser, spatializing data points as Warburgian "intervals" (Zwischenraum) where proximity implies symbolic resonance.

4. Hypertextual Narrative: Scenes were linked via Aventura.js’s decision-tree logic, allowing users to navigate between panoramic views (e.g., period trends) and granular details (e.g., individual image metadata).
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
This integration of computational workflows with hermeneutic practices—such as abductive reasoning and iterative annotation— transforms Aventura.js from a tool for electronic literature into a medium for speculative historiography. By embedding human interpretation into data structures (e.g., manually tagged Pathosformel categories), the library bridges Warburg’s analogue montage and digital interactivity, enabling scholars to model historical arguments through both algorithmic and intuitive exploration.
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
Regarding point three in the pipeline, the three visualisation types —circle-packed treemaps, scatterplots, and image pairings— were selected to operationalize Warburg’s 'interval' (Zwischenraum) through computational means. Each corresponds to a mode of symbolic reasoning derived from Rodríguez Gómez approach on data visualisation based on Peirce’s sign trichotomy (<cite data-cite="7299034/779MQTKK"></cite>):

- Circle-packed treemaps: These visualise nested hierarchies (e.g., period > genre > motif), reflecting how cultural categories structure interpretations. Their radial design echoes Warburg’s non-linear panels, where proximity implies elective affinity.

- Scatterplots: by plotting dimensions like period against figure/background balance, they reveal diachronic shifts in compositional logic, such as the decline of Humboldt’s landscape-centric Carguero after 1819.

- Image pairings: Juxtaposing images (e.g., Humboldt vs. Roulin) foregrounds visual contrasts in posture, gaze, and context, inviting abductive reasoning —a key Warburgian method— where viewers infer latent connections.

Together, these visualisations reject quantitative reductionism, instead modelling hermeneutic processes: treemaps organize, scatterplots contextualize, and pairings defamiliarize, mirroring the Mnemosyne Atlas’s dialectic of order and surprise.
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
Additionally, our experimental use of Aventura.js intended to address infrastructural constrains in the practice of digital humanities in our context. As Takhteyev (<cite data-cite="7299034/RF6KHEXQ"></cite>)  has studied, the practice of software development in Latin America occurs in a state of “cultural diglossia”, or movement between two languages, the default language of coding and software documentation: English, and other local languages: for instance, Spanish or Portuguese. In this sense, addressing the linguistic gap by creating local software helps to reappropriate computational tools for the study of humanities in situated contexts and to reduce knowledge gaps derived from linguistic barriers. This is an important aspect of our project, since the creation of local tools allowed us to have agency and control over the expected results, instead of depending on tools created for other social, academic, and infrastructural contexts. Having the power to manipulate the code, and to think in our native language, helped us to develop a system of experimentation, iteration, and streamlining that would have not have been possible by the use of black box tools that have their own coding idiosyncrasies.
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
As was described, Aventura.js is a tool for creative coding in the field of narrative and literary expression, but it can be used as well for exploratory research in the humanities and for divulging the results of such research. Having access and understanding of the underlying code helped us to repurpose the original use of the software to a scholarly one. An important underlying proposition of this paper is that strategies from computational creativity can be used as speculative research through hermeneutic practices and divulgation methods. In this section we focus on the potential of using Aventura’s interactive stories system for creating iconographic panels, inspired by the epistemological principles coming from Warburg’s Mnemosyne Atlas described before, and the possibility of extending Warburg’s system of interpretation by means of data visualisation and hypertextuality. We, thus, used Aventura.js to design a narrative exploration of the collection of the *Carguero* images by combining different types of data visualisations into the scene structure offered by the JavaScript library.
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
### Designing an interactive panel
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
First, we created a dataset that contains multiple metadata about our collection of 193 images related to the Carguero theme. Such dataset can be accessed in its totality in the data section of this paper. For each image, the following column data is described (column names are in Spanish, English descriptions where added for context):
<!-- #endregion -->

```python tags=["hermeneutics"]
# Import dependencies

import pandas as pd
from IPython.display import HTML
from observable_jupyter import embed
```

```python jdh={"module": "object", "object": {"source": ["Column data"]}} tags=["hermeneutics", "table-columnmetadata-*", "data-table"]
# Load column metadata
metadata_path = "./data/CargueroColumnMetadata.csv"
metadata = pd.read_csv(metadata_path)
metadata_csv = metadata.to_csv(index=False)
metadata
```

<!-- #region tags=["hermeneutics"] -->
And the following table is a preview of the anotated dataset:
<!-- #endregion -->

```python jdh={"module": "object", "object": {"source": ["Dataset anotated"]}} tags=["hermeneutics", "table-dataset-*", "data-table"]
# Load data set
data_path = "./data/CargueroData.csv"
data = pd.read_csv(data_path)
data_csv = data.to_csv(index=False)
data
```

<!-- #region tags=["hermeneutics"] -->
It is important to clarify that this collection does not intend to be exhaustive but, rather, representative of the *Carguero* theme within the scope of our research. In the Warburgian spirit of good neighbourliness, these images were collected through a recurrent research, both intentional and serendipitous, largely conducted by one of the authors. This is especially true for post-nineteenth century images such as memes, parodies, and other types of reappropriations of the Carguero theme. However, we do not see the tools used here as large scale, number crunching machines that extract general formal patterns in machine readable representations of cultural objects (i.e. distant reading qua (<cite data-cite="7299034/T2ILN7H7"></cite>)), but as, on the one hand, interfaces that facilitate the hermeneutic process of creating and presenting a collection, and, on the other, as tools for exploring arguments visually and interactively by users, allowing them to produce their own interpretations. Following Drucker (<cite data-cite="7299034/HQTFQ3ZK"></cite>), we aim to make the act of hermeneutic reading explicit, and to use the tool not just for representing, but also for modelling interpretation: “[t]he idea of modelling implies that a graphical expression serves as a primary mode of knowledge production, not a secondary expression of preexisting data. This suggests that a graphical expression might be used to create and/or show the features of a model of interpretative activity” (2). In this sense, our method intends to integrate visual representation, interactivity, and textuality into a coherent historic argument. Such a hermeneutic approach, nevertheless, is grounded on a rigorous data-assisted methodology in the sense of Escobar Varela (<cite data-cite="7299034/DCG6UVUR"></cite>), that is, using computers to view in different ways, to transform perspectives, and to “to enable alternative readings via a computational defamiliarization strategy” (p. 9).
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
Our approach resonates with the field of “software studies” (<cite data-cite="7299034/HGYCD6E8"></cite>; <cite data-cite="7299034/FYN434JN"></cite>), which examines how computational operations (for instance, loops, randomization, conditionals, functions, etc.) are culturally embedded and can serve as epistemological tools and strategies for understanding and manipulating experience. In this sense, we are conscious that computational methods and interface design enables or constrains certain types of interpretation. The design of our interactive atlas intends to take advantage of such considerations and, thus, makes use of filtering, hyperlinks, the possibilities of pixel manipulation, and other web technologies' affordances. Combining these affordances we aim to construct what Mitchell Whitelaw (<cite data-cite="7299034/ASP3UWQY"></cite>) calls “generous interfaces”, that is, interfaces that promote browsing, finding common patterns, and getting surprised with unexpected elements in a collection. The combination of affordances we propose here serve as a: “layering and juxtaposition of different representational forms within a single overview, creating a form of internalised parallax that provokes rather than determines interpretation" (paragraph 36).
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
In this line, and next in the process, we used the filtering function of dictionary-like data structures, available in Javascript as well as many other languages, to create subsets of our main dataset based on conditionals applied over different columns of temporal and categorical data. We used such filtered subsets to define possible panels that could be connected as interrelated scenes. Some of the specific filters we used for the Carguero dataset are described in detail in the next section. We view conditional filtering as a way to interpret, in the sense of partially focusing on particular elements of interest in a group of objects to uncover insights that would not be apparent in a space with noisier, competing information. Filtering thus serves as both a browsing strategy and an argumentative tool; making connections more visible and patterns more salient.
<!-- #endregion -->

As mentioned, we used these filtered data subsets to create multiple graphics, particularly, we designed the panels based on three types of data visualisations. The selection of visualisations was oriented by Sergio Rodríguez Gómez classification of visualisations derived from Pierce’s trichotomy of signs: icons, indexes and symbols. Specifically, we decided to use symbolic visualisations, namely, graphics that allow audiences to find conventional connections between cultural elements. These graphics are our own attempt at computationally generating Warburgian panels with meaningful intervals (Zwischenraum). Each type of visualisation emphasises different aspects of our dataset: hierarchies and groupings, changes through time, numeric correlations, visual commonalities or differences. In this way, the arrangement of each visualisation highlights particular Pathosformel, focusing on the survival of thematic relationships and defining a distinct feature space.

<!-- #region tags=["hermeneutics"] -->
Finally, to create an interactive tour in Aventura.js, we described a set of scenes in a JavaScript Object using the filtered subsets. For each scene, there is a syntax for defining interface elements, such as texts, images, buttons, clickable areas, and hypertext elements —namely, it is possible to jump from current scenes to other scenes. An application called Aventura Interactiva, currently in beta version, offers a graphical user interface that facilitates building the scenes system [(To Aventura Interactiva)](https://srsergiorodriguez.github.io/aventura-interactiva/), and it allows exporting the scenes in a JSON file with the correct Aventura.js syntax. With this information, Aventura.js creates an interface that lets the user move between scenes. We propose that this hypertextual system is useful to create a z-dimension in which it is possible to move from one panel to another to further deepen the reading of the dataset and its symbolic relations. This hypertextual z-dimension is in essence non-linear, as the user can make decisions about which other panels or narrative paths to explore. However, we defined our tour as a semi-linear narrative, in which there is a central argument being developed but it is possible to take detours to transversal relationships and topics, following the principle of generosity alluded to before. Additionally, by design, the user can move from a panoramic view enabled by general panels and data visualisations to a detailed view of each collected piece and its associated metadata. This goes in line with North and Schneiderman’s information seeking mantra (<cite data-cite="7299034/357CFLFV"></cite>): overview, filter and zoom.
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
For combining the default scene system of Aventura,js with the requirements of this project, we wrote a set of helper functions that integrate and preprocess the conditional filtering strategy and the data visualisations before the scenes are rendered. These functions take a conventional Aventura.js set of scenes, enhanced with additional information about the filters and types of visualisations expected for each scene, and, behind the scenes, converts that information into full graphics derived from the limited subset. These ad-hoc functions worked first as a prototype and now, after some testing, were fused into the main code of Aventura.js to expand its functionality and to facilitate scholarly projects similar to the one we propose here. In this sense, this project served to enhance the affordances of the tool so it can be used for similar purposes in the future.
<!-- #endregion -->

```python tags=["hermeneutics"]
# This cell shows the scenes that describe the structure of the interactive panels
# This dictionary contains information for some of the scenes that will be part of the panel
# Such information includes things like: filters, types of visualisation, hypertextual connections, metadata and texts
# The extra functions created for this project will process this dictionary, apply the filters, and render the visualisations, and will automatically inject additional scenes. For instance, one scene for each image with its corresponding metadata

scenes = {
  "start": {
    "viz": {"filter":[], "type": "compare", "x": 6, "y": 11},
    "title": "A comparison between Humboldt's and Roulin's Carguero models",
    "text": "Consider two models of the Carguero (Man carrier), the representation of subalternized people that were used as means of transport in the harsh geographical accidents of nineteenth-century Colombia, and other places in South America. The first model comes from the famous Prussian naturalist Alexander von Humboldt, who, in his diary, and later in his work Vues des Cordillères, recorded his encounter with a Carguero named Villanero. His description of the encounter became famous and a point of reference for a large number of travellers when describing their own experiences. The second one is the model of François Desiré Roulin, a scientific traveller who made part of an expedition composed of French professionals recommended by Georges Cuvier and Alexander von Humboldt to the plenipotentiary minister of Gran Colombia, Francisco Antonio Zea.<br>Note: the panels in this Atlas contain clickable areas.",
    "options": [ { "btn": "Continue main route", "scene": "scatterPeriodoFigura" } ]
  },
  "scatterPeriodoFigura": {
    "viz": {"filter": [ ["fecha", "<", 1900], ["otros", "=", "false"] ], "type": "scatter", "x": "periodo", "y": "figura/fondo"},
    "title": "Figure/Background vs. Period",
    "text": "This panel shows that there are more images in the 'background' (fondo) and 'balance' (equilibrio) categories in the period between 1770 and 1810 than in other periods, that is, there is a predominance of representations of the Carguero as a part of the landscape, rather than as the centre of attention. Images from the late colonial period (1770-1810) participated in a transformation in visual epistemology characterized by presenting different human classifications, understood as castes or nations, in their immediate geographical contexts, including the animal and botanical varieties peculiar to them.",
    "options": [
      { "btn": "Continue main route", "scene": "pack1750_1810" },
      { "btn": "Detour: 'Quadro del Perú'", "scene": "detour1"}
    ]
  },
  "detour1": {
    "meta": 1,
    "text": "From <a href='https://flacso.edu.ec/laglobal/cabinet/artificialia/quadro-del-peru/' target='_blank'>CLACSO's LAGLOBAL</a>: 'The Quadro’s primary author was José Ignacio de Lequanda (Vizcaya 1748 – Cadiz 1800). The illustrations were made by Louis Thiebaut from many sources, including the so-called Trujillo del Perú Codex (1782–85) and the Malaspina Expedition (1789-1794). Lequanda resided for most of his productive life in Lima, where he contributed to the Mercurio Peruano (1791–94). The material of the Quadro is oil on canvas but it is distinguished by its unusual dimensions (331 cm × 118 cm) and composition: 195 scenes with 381 figures surrounded by explanatory text. In addition, the framed canvas is crowned and gilded with twin cornucopias graced by a sheaf of arrows, symbolising the bounty or ‘treasure’ of the New World under Hispanic Monarchy. The two central geographical images (an east-up map of central Peru, and below it a profile view of the rich mines at Hualgayoc) form an axis that represents the new economic centre of 18th-century Peru, which had shifted from Potosí to the region adjacent to Lima. The central region united three major ecological and productive zones. In the Quadro, this vertical economic geography is represented by the unfolding of a concentric sequence of niches populated by fishes and amphibians, small and large quadrupeds, simians, and humans. The latter is divided in two classes, ‘civilised’ (or coastal and highland) and ‘savage’ (or Amazonian), with each composed of 16 ‘nations’. Birds occupy the perimeter of the Quadro, seemingly lifting the entire canvas on their wings. In a word, the Quadro is a tableau that reveals in a synoptic visual field what today we call ‘biodiversity’ but which in enlightened circles of the times was called ‘the idea of Peru.’ This ‘idea’ held that Peru was a mirror of the universe and the crown jewel of Hispanic Empire'.",
    "areas": [
      { "x": 424, "y": 348, "w": 621, "h": 338, "btn": "", "tooltip": "", "scene": "nacionesCivilizadas" },
      { "x": 1293, "y": 329, "w": 395, "h": 417, "btn": "", "tooltip": "", "scene": "detalleNacionSalvaje" }
    ]
  },
  "nacionesCivilizadas": {
    "meta": 2, "options": [ { "btn": "Back to main route", "scene": "scatterPeriodoFigura"} ]
  },
  "detalleNacionSalvaje": {
    "meta": 107,
    "title": "Detail of 'Quadro del Perú': wild nations",
    "text": "The two characters depicted here were protagonists of a network of model copying (the 'visible empire' in the words of Art Historian Daniela Bleichmar), exemplary of the practices of image circulation used to govern from a distance, coordinate between administrative units, and circulate knowledge in the late eighteenth century Hispanic empire.",
    "options": [ { "btn": "Back to main route", "scene": "scatterPeriodoFigura"} ],
    "areas": [ { "x": 637, "y": 392, "w": 1274, "h": 783, "btn": "", "tooltip": "", "scene": "relacion" } ]
  },
  "relacion": {
    "meta": 106,
    "title": "Detail of Viceroy Gil de Taboada's Government report",
    "text": "For instance, these images were used in a government report where Viceroy Gil de Taboada addressed his successor, Ambrosio O'Higgins, Marquess of Osorno. This report, concluded in 1796, was elaborated by two of the advisers of the former ruler: Hipólito Unanue and the accountant José Ignacio de Lecuanda.",
    "options": [ { "btn": "Back to main route", "scene": "scatterPeriodoFigura"} ],
    "areas": [ { "x": 220, "y": 215, "w": 440, "h": 430, "btn": "", "tooltip": "", "scene": "indiosMalaspina" } ]
  },
  "indiosMalaspina": {
    "meta": 103,
    "title": "Bauza collection form Malaspina Expedition",
    "text": "The characters originally belonged to a series of plates made in the context of the Malaspina expedition, currently located in the Museum of America in Madrid under the 'Bauza collection'. The images refer to Peru. The botanists Luis Née, Tadeo Haenke and the commissioners of the Viceroy Gil de Taboada, Juan Tafalla and Francisco del Pulgar, participated in this enterprise. One of the most important areas of exploration was coming in direct contact with native populations of the Amazon. In their visual composition, some of these images put together two types of Indians from a given region and add an explanatory text.",
    "options": [ { "btn": "Back to main route", "scene": "scatterPeriodoFigura"} ],
    "areas": [ { "x": 547, "y": 273, "w": 374, "h": 540, "btn": "", "tooltip": "", "scene": "indioIquito" } ]
  },
  "indioIquito": {
    "meta": 104,
    "title": "Bauza collection form Malaspina Expedition",
    "text": "The authorship of these images is under discussion. They are generally attributed to an anonymous painter and sometimes to Tadeo Haenke. Although all the images are in the same collection, and it has traditionally been assumed that they were made in the context of the Malaspina Expedition, there are doubts about authorship consistency between the images that present the Indians in pairs and those that present them individually. On the one hand, based on a formal study of the style, the ink and the paper used, Fernando Villegas has affirmed that the first series of images were not elaborated by the expeditionaries of the Malaspina Expedition but were made during the exploration of Governor Francisco Requena and the priest Gribal. On the other hand, Peralta Ruiz affirms that the resemblance between the two series of images proves that the expeditionaries in charge of Malaspina (Nee and Haneke) came across Gribal and Requena and allowed them to copy their drawings.",
    "options": [ { "btn": "Back to main route", "scene": "scatterPeriodoFigura"} ]
  },
  "pack1750_1810": {
    "viz": {"filter": [ ["periodo", "=", "1750 - 1810"], ["otros", "=", "false"] ], "type": "pack", "x": "figura/fondo", "y":"figura/fondo"},
    "title": "Figure/background in the 1750 - 1810 period",
    "text": "Variations around the idea of placing human types in their geographical and natural contexts can be seen in Vicente Albán's mestizaje paintings, and in Quadro del Perú commissioned by Ignacio Lecuanda. This transformation is, paradigmatically, also present in Humboldt's Plate V of Vues des Cordillères, depicting the Carguero. There is a balance in representation of natural objects along with the activities of the Carguero, as they are all illustrative elements of the use of plants, means of transport, and other particularities of Andean verticality. This explains why during this period the 'balance' (equilibrio) category is preponderant",
    "options": [
      { "btn": "Continue main route", "scene": "scatterRoulin" },
      { "btn": "Detour through 'Plate V of Vues des Cordillères'", "scene": "detour2" }
    ]
  },
  "detour2": {
    "meta": 6,
    "text": "Plate V of Vues, showing the passage of the Quindío region, is an important window to Humboldt's conceptions about the mixing art and science for the purpose of sensitively presenting vertical American nature. Oliver Lubrich refers to plate V of Vues as a multiple perspective drawing, designed from the points of view of different disciplines, and open to diverse readings. The image can offer aesthetic enjoyment and relevant information to botanists, geologists, mineralogists, and meteorologists. This is because there are plants, landscapes, cloud formations, geological profiles, villages, an inter-Andean valley, an eastern mountain range, multiple signs that show the climate, vegetation, location, and social and productive activities that are carried out with plants and natural resources in general. In addition, it tells a sociological and political story related to Cargueros who work with travellers and who stage a series of social oppositions and complexities typical of the mountainous Andean world, colonial society, and global society in a process of transformation. In the image we see a Carguero who stares at the viewer while walking with his empty chair, probably the one that should have been occupied by Humboldt, who refused to use the service. In this sense, it could be said that the image is a 'picture or scene of nature' which presents a careful organization of the landscape so that various natural and cultural phenomena interact and account for organic functioning.",
    "options": [
      { "btn": "Back to main route", "scene": "pack1750_1810"},
      { "btn": "Humboldt as source model", "scene": "humboldtPack"}
    ],
    "areas": [
      { "x": 907, "y": 660, "w": 316, "h": 474, "btn": "", "tooltip": "", "scene": "villanero" },
      { "x": 1225, "y": 619, "w": 273, "h": 547, "btn": "", "tooltip": "", "scene": "agave" },
      { "x": 615, "y": 342, "w": 727, "h": 453, "btn": "", "tooltip": "", "scene": "humboldtPack" }
    ]
  },
  "villanero": {
    "meta": 122,
    "options": [  { "btn": "Back to main route", "scene": "pack1750_1810"} ],
    "areas": [ { "x": 157, "y": 242, "w": 120, "h": 154, "btn": "", "tooltip": "", "scene": "bijao" } ]   
  },
  "bijao": {
    "meta": 119,
    "text": "The Cargueros act as guides and make it possible to cross the difficult path, not only because of their physical strength, but also because of the knowledge they have of the landscape they inhabit. They know the signs of the terrain, climate, and usefulness of plants. The same Carguero, the one in the image that stares at the viewer and has an empty chair, carries in his hands some bijao leaves that, the story tells us, will later be used to make tents and shelter from the rain. Humboldt draws the bijao leaves in his diary",
    "options": [ { "btn": "Back to main route", "scene": "pack1750_1810"} ]
  },
  "agave": {
    "meta": 120,
    "text": "There is a flowering Fique or Agave on the right side of the Plate V of Vues. This plant is used for the elaboration of ropes that tie the Bijao leaves and secure the tents. In Humboldt's diaries, there are drawings of the tents specifying how to tie them so that they are resistant. In the story, these plants are considered regarding their geographical location in relation to altitude, taxonomically by being categorized into families and species, and by their usefulness by speculating about their industrial applications.",
    "options": [ { "btn": "Back to main route", "scene": "pack1750_1810"} ]
  },
  "humboldtPack": {
    "viz":{ "filter": [ ["modelo", "=", "humboldt"], ["otros", "=", "false"] ], "type": "pack", "x": "modelo", "y": "modelo"},
    "title": "Humboldt as source model", "text": "",
    "options": [ { "btn": "Back to main route", "scene": "pack1750_1810"} ]
  },
  "scatterRoulin": {
    "viz": {"filter": [ ["fecha", "<", 1900], ["otros", "=", "false"] ], "type": "scatter", "x": "periodo", "y": "modelo"},
    "title": "Source model vs. Period",
    "text": "As seen in this panel the most used model during the period '1819 – 1850' was Roulin’s...",
     "options": [ { "btn": "Continue main route", "scene": "packRoulin" } ]
  },
  "packRoulin": {
    "viz": {"filter": [ ["fecha", "<", 1900], ["periodo", "=", "1819 - 1850"], ["otros", "=", "false"] ], "type": "pack", "x": "periodo", "y": "modelo"},
    "title": "Source model in the 1819 - 1850 period",
    "text": "As an alternate visualisation, Roulin's predominance can also be seen in this hierarchical disposition of source models in the 1819 - 1850 period.",
    "options": [ { "btn": "Continue main route", "scene": "packHumboldtPeriodo" } ]
  },
  "packHumboldtPeriodo": {
    "viz": {"filter": [ ["fecha", "<", 1900], ["otros", "=", "false"], ["modelo", "=", "humboldt"] ], "type": "pack", "x": "periodo", "y": "figura/fondo"},
    "title": "Humboldt's Figure/Background and Periods",
    "text": "This panel shows that, in the '1819-1850' period, some of the images that used Humboldt’s image as a model turned the landscape into 'figures' (figura), that is, gave preponderance to the lanscape instead of the characters, and some even took the figures out and turned the images into pure landscape representations, that is, 'background' or (fondo)",
    "options": [ { "btn": "Continue main route", "scene": "roulinHumboldt" } ]      
  },
  "roulinHumboldt": {
    "viz": { "filter":[], "type": "compare", "x": 6, "y": 11 },
    "title": "Second Comparison between Humboldt's and Roulin's Carguero images",
    "text": "In general, Roulin's is the most used model, although all travelers quote Humboldt as a reference for the description of the Cargueros, they do not use his image as a reference. This comparison panel shows the evident differences in composition for both models. While Humboldt's image highlights the Carguero as part of the landscape, Roulin’s highlights its bodily features.",
    "options": [ { "btn": "Continue main route", "scene": "roulinModel" } ]
  },
  "roulinModel": {
    "viz": { "filter": [ ["fecha", "<", 1900], ["modelo", "=", "roulin"], ["otros", "=", "false"] ], "type": "pack", "x": "modelo", "y": "soporte"},
    "title": "Material substrates of Roulin's derivations",
    "text": "Here we can observe the great diversity of media in which this model circulated, adapted by communities of interpretation that demanded new epistemic and aesthetic criteria of validity.",
    "options": [
      { "btn": "Practices of image circulation", "scene": "circulationInscription" },
      { "btn": "Animal and Human types", "scene": "animalHumanTypes" },
      { "btn": "Continue main route", "scene": "roulinQuindio"}
    ]
  },
  "circulationInscription": {
    "viz": { "filter":[], "type": "compare", "x": "166", "y": "167" },
    "title": "Techniques of inscription and practices of image circulation",
    "text":"The drawings and images made by Roulin participated in a network of image circulation of 19th century visual culture, which involved the rationalization of production, division of labor, and mass production for a market of travelers who were interested in these products. And throughout the twentieth century, and even today, these images have been predominantly seen as visual testimonies of the early republic and, as such, have been integrated into narratives of nation building. The images share a series of iconographic coincidences that indicate the practice of adapting models to different contexts by means of details, such as the background, tools, clothing, costumes, and other elements that vary between compositions. These practices show 'multiple authorship' and 'multiple originals' in the postcolonial Hispanic space. An eloquent case is the correspondence and contrast between the plate 'Taking chocolate in Bogotá', from Joseph Brown's collection, and the plate 'Caballero tomando Té', from the 'De Santiago a Mendoza' collection attributed to Alphonse Giast. The characters are in similar positions, but their clothing, hairstyles, skin complexion, watercolor background, and distribution of surrounding elements change from one image to another. One of the most interesting elements of the contrast is the identification of a 'bombilla' for drinking mate on the table in the background of the watercolor attributed to Giast, a practice characteristic of Chile and Argentina that, on the contrary, was not carried out in Nueva Granada.",
    "options": [ { "btn": "Roulin's hypothetical album", "scene": "roulinAlbum"} ]
  },
  "roulinAlbum": {
    "meta": 165,
    "title": "Roulin's hypothetical album",
    "text": "The 'De Santiago to Mendoza collection' coincides with some of Roulin's models. One example, among other possible ones, is the plate 'Mujer con balde' from the Chilean collection, which shows in the foreground a character derived from the the background of Roulin's watercolor 'Place de St. Victorin, à Bogota'. In addition, the composition of the space is different, a different perspective with coinciding elements. Roulin's prominence in the visual culture of the early Republican period is extended. For example, Auguste Le Moyne copied the profile of Simón Bolívar drawn by Roulin in 1828; his watercolors were copied and published in the travelogues of Gaspar Mollien (1824), John Potter Hamilton (1827), Guilaume Lallement (1826), Alcide D'Orbigny (1841) and M. A. de Latrre (1848). Modifications of his motifs can also be found in engravings by John Potter Hamilton (1827, 1993), Gaetano Osculati (1954), and Cesar Famin (1837). Thus, is is possible that Roulin may have had a catalogue of plates at the service of travelers with scenes of customs, types, views, and monuments.",
    "options": [ { "btn": "Back to main route", "scene": "roulinModel"} ],
    "areas": [
      { "x": 199, "y": 350, "w": 156, "h": 283, "btn": "", "tooltip": "", "name": "mujer", "scene": "roulinPlaza" },
      { "x": 303, "y": 339, "w": 154, "h": 137, "btn": "", "tooltip": "", "name": "area", "scene": "roulinPlaza" }
    ]
  },
  "roulinPlaza": {
    "meta": 154,
    "options": [
      { "btn": "Back to Roulin's hypothetical album", "scene": "roulinAlbum"},
      { "btn": "To Costumes/Colombie", "scene": "costumesColombie"}
    ],
    "areas": [
      { "x": 400, "y": 762, "w": 152, "h": 276, "btn": "", "tooltip": "", "name": "cargando", "escena": "agachado" },
      { "x": 586, "y": 708, "w": 140, "h": 152, "btn": "", "tooltip": "", "name": "agachado", "escena": "agachado" },
      { "x": 748, "y": 653, "w": 104, "h": 178, "btn": "", "tooltip": "", "name": "mujerConBalde", "escena": "roulinAlbum" },
      { "x": 382, "y": 439, "w": 400, "h": 350, "btn": "", "tooltip": "", "name": "fuente", "escena": "roulinAlbum"  },
      { "x": 1075, "y": 838, "w": 258, "h": 204, "btn": "", "tooltip": "", "escena": "perro" }
    ]
  },
  "animalHumanTypes": {
    "viz": {"filter": [ ["modelo", "=", "roulin"], ["genero", "=", "tipos animales"] ], "type": "pack", "x": "modelo", "y": "genero"},
    "title": "Roulin's Animal types",
    "text": "In relation to the aesthetic and scientific conditions of acceptability, Roulin's conceptual and visual universe is directly related to his scientific training as a physiologist practicing comparative anatomy in the scientific circle of the Academy of Natural Sciences in Paris. He published some of the results of his research in the Annales des Sciences Naturelles and participated in the edition of Le Règne Animal created by Cuvier's disciples in 1836. Roulin's watercolors and drawings show his interest in highlighting aspects related to the animal and human classification that had been postulated in his scientific circle, which, from a visual point of view, sought to establish relationships between external characters, with the systematic functioning of internal organs. This panel shows the animal types represented in a publication on the Tapir in the Annals of Natural Science and some drawings found in Roulin's notebooks. <img src='https://lh3.googleusercontent.com/d/18XgsbcnSER4Y2z1dxNErwKX6pwV8fZt_'>The tapir was drawn from the carcasses of a pair of specimens found in Sumapaz páramo, near Bogotá. He had to content himself with making an abbreviated description on the spot, and drawing a simple line in pencil. A Wollaston camera-lucida helped him to draw the outline of the head. In this way, Roulin completed a series of drawings that were placed before the eyes of the academy when attached to his memoir published in the Annales des Sciences Naturelles",
    "options": [
      { "btn": "Back to main route", "scene": "roulinModel"},
      { "btn": "Roulin's Human types", "scene": "roulinHuman"},
      { "btn": "Detour through Roulin's dogs", "scene": "perro" }
    ]
  },
  "perro": {
    "meta": 192,
    "text": "Roulin also published a memoir in the Annales des Sciences Naturelles in 1829 about domestic animals brought from Europe to the New World. Some of the watercolors, found in 2003, can be interpreted in relation to this publication. The watercolor 'Bords de la Magdelaine. Ménage d'une famille de pêcheur' of 1823 seems to be an illustration of the text in which it is mentioned that the 'dogs of hot climate (perros de tierra caliente)' that live with the fishermen on the banks of the Magdalena River, have a deteriorated breed due to lack of food and exceptional conditions that force the animals to return to wild states. In Roulin's Plates, such as 'Bords de la Magdelaine', 'Place de St. Victorin à Bogotá' or 'Entrée du marché de Honda', dogs can be seen living side by side with humans in different climates and regions. This allows us to see how dogs have changed and adapted to different environments and situations, and how they have been affected by the communities in which they live. Ultimately, Roulin's watercolors, in conjunction with his written memoir, offer valuable insights into changes in domestic animals and their relationship to climates and communities in the New World.",
    "options": [
      { "btn": "Back to Roulin's hipotetic album", "scene": "roulinAlbum"},
      { "btn": "Back to Costumes/Colombie", "scene": "costumesColombie"}
    ],
    "areas": [
      { "x": 473, "y": 205, "w": 348, "h": 249, "btn": "", "tooltip": "", "scene": "perro1" },
      { "x": 305, "y": 569, "w": 338, "h": 304, "btn": "", "tooltip": "", "scene": "roulinPlaza" },
      { "x": 368, "y": 1006, "w": 343, "h": 276, "btn": "", "tooltip": "", "scene": "roulinMayor" },
      { "x": 858, "y": 982, "w": 338, "h": 205, "btn": "", "tooltip": "", "scene": "perro4" },
      { "x": 1334, "y": 983, "w": 388, "h": 257, "btn": "", "tooltip": "", "scene": "roulinMayor" },
      { "x": 1327, "y": 610, "w": 385, "h": 252, "btn": "", "tooltip": "", "scene": "perro6" },
      { "x": 1344, "y": 261, "w": 361, "h": 257, "btn": "", "tooltip": "", "scene": "perro7" },
      { "x": 802, "y": 587, "w": 499, "h": 398, "btn": "", "tooltip": "", "scene": "bordes" }
    ]
  },
  "bordes": { "meta": 146 }, "perro1": { "meta": 156 }, "perro7": { "meta": 148 }, "perro4": { "meta": 149 }, "perro6": { "meta": 159 },
  "roulinMayor": {
    "meta": 153,
    "options": [
      { "btn": "Back to Roulin's hypothetical album", "scene": "roulinAlbum"}
    ],
    "areas": [
      { "x": 477, "y": 575, "w": 121, "h": 325, "btn": "", "tooltip": "", "scene": "mujerSombrero" },
      { "x": 894, "y": 695, "w": 215, "h": 465, "btn": "", "tooltip": "", "scene": "sacerdote" },
      { "x": 133, "y": 850, "w": 169, "h": 139, "btn": "", "tooltip": "", "scene": "perro" },
      { "x": 1123, "y": 639, "w": 157, "h": 117, "btn": "", "tooltip": "", "scene": "perro" }
    ]  
  },
  "roulinHuman": {
    "viz": {"filter":[ ["modelo", "=", "cuvier"] ], "type": "pack", "x": "modelo", "y": "modelo" },
    "title": "Roulin's Human types",
    "text": "In the specific classification of the human race as a bipedal mammal, Cuvier considered that its development was determined by external aspects, such as climate or geography, and internal aspects, such as the intellectual characteristics of the races. These were organized in a hierarchy that descended from the Caucasian race to the Ethiopian, which was represented as the least developed. The position of Americans in this classification was uncertain, since it was not possible to resolve the multiplicity of characteristics observed in the same category. In fact, Roulin drew from Cuvier’s disciples edition of Le Règne Animal some of the plates of American types that illustrate their difficult classification, and is cited as one of the travellers who provided information on the subject.",
    "options": [
      { "btn": "Comparision between Roulin's Animal Kingdom plate and a watercolour plate", "scene": "types" },
      { "btn": "To Costumes/Colombie", "scene": "costumesColombie"},
      { "btn": "Back to main route", "scene": "roulinModel"}
    ]
  },
  "types": {
    "viz": {"filter": [[]], "type": "compare", "x": "138", "y": "143"},
    "title": "Comparision between Roulin's Animal Kingdom plate and a watercolour plate",
    "text": "Roulin's training in physiology and comparative anatomy allowed him to direct his gaze towards aspects other than landscapes, focusing on the study of anatomy, races, and how environmental factors affect organisms. One of Roulin's watercolors can serve as an illustration: 'Bords de la Magdelaine. Le bal du petit ange' (Banks of the Magdalena. The little angel's dance). The image shows the funeral ritual of the inhabitants of the banks of the Magdalena River. There is a crowd circle animating the dance of two Afro-American people in the center. Both subjects had darker skin color and characteristics that could be imputed to the race Cuvier calls 'Ethiopian,' such as curly hair. On the other hand, the subjects in the crowd cheering with palms and instruments have some of the characteristics given by Cuvier to the indeterminate American race, such as straight hair and 'copper red' skin color.",
    "options": [ { "btn": "Back to main route", "scene": "roulinModel"} ]
  },
  "roulinQuindio": {
    "viz": {"filter": [[]], "type": "compare", "x": "11", "y": "22"},
    "title": "Roulin, d'Orbigny and the category of 'type'.",
    "text": "The sketch of the camp on the Quindío road was reproduced in the biography of Roulin, along with several other sketches, published by Marguerite Combes in 1929. The drawing shows a camp in which a Carguero can be seen at the center of the composition. According to Combes, the man with an open umbrella being loaded is a notary who accompanied Roulin and Boussigault on the mission to inspect and draw up the plan of the mines of La Vega de Supía. Combes mistakenly states that the subject in the lower right is Boussingault. Roulin makes a direct reference to this drawing in a footnote in an article on the Tapir in his collection of scientific papers called 'Histoire naturelle et souvenirs de voyage' of 1865. Roulin made this drawing on behalf of Humboldt. Roulin’s sketch of the Carguero was modified and turned into an engraving in Alcide d'Orbigny's travelogue, 'Voyage Pittoresque dans les deux Amériques', a popular book that contributed significantly to the dissemination of knowledge of Colombia in Europe. D'Orbigny, a mollusk specialist, belonged to the same scientific circle as Cuvier and Roulin. Like the latter, he was credited as a 'disciple' in the 1836 edition of Le Règne Animal. In fact, his figure plays a fundamental role in research on the determination of the racial characteristics of Americans for Cuvier's classification of that book. In 1825, he was commissioned by the Museum of Natural History in Paris to investigate 'in depth the language and physiological characteristics' of South American people. As an analytical tool, Roulin and d'Ornigny helped transpose, from the comparative anatomy of animals, the category of 'type' to find a way to organize the multiplicity of human populations existing in America. In this sense, Roulin's and d'Orbigny's Carguero drawings can be interpreted as an investigation into a 'social type' that existed because of specific climatic, geographical, and racial features. These are rationalized by the observations of the external characters and their relations with internal organic functioning. Roulin refers to the Carguero as a 'human mount', hinting at a comparison of different modes of transportation and uses of human and animal muscle-driven motion power.",
    "options": [ { "btn": "Continue route", "scene": "roulinHamilton"} ]
  },
  "roulinHamilton": {
    "viz": {"filter": [[]], "type": "compare", "x": "11", "y": "14"},
    "title": "Hamilton Picturesque Carguero",
    "text": "A derivation of Roulin's model of the Carguero is found in the travelogue of the British Diplomat Colonel John Potter Hamilton, the first official envoy on behalf of the British government to Colombia. After returning to his homeland, he published his travelogue with the famous publishing house John Murray. This publishing house was noted, among other things, for tapping into the demand for such products, and published more than 200 travel books during the first half of the 19th century. Hamilton used, with adaptations, several of Roulin's models in his book. In particular, the image of the Carguero changes the direction of the characters and places them on a laborious ascent. They climb around a tree on the curve of a steep mountain road (see graphical comparison). The image is similar to other images of the period, like those in the travelogues of British merchant traveller Charles Stuart Cochrane and Swedish diplomatic traveller August Gosselman. These images are characterized by the use of a picturesque aesthetic as a strategy to frame the landscape and recompose it with industrious human figures, settlements, crops, and productive animals, in contrast to the untamed wilderness that still needs to be controlled by man. In these stories, the images coexist with visual metaphors that frame the observations of nature as 'pictures', 'paintings', 'drawings', 'sketches', 'maps', 'scenery', 'beautiful shows', 'dioramas', 'panoramas', 'magic lanterns' or 'Peep Shows'. The use of the Carguero image is indicative of the resignification of picturesque aesthetics in the voyages to America, characterized by the use of ethnographic and social themes of concern to travellers of the period, who were, in Mary Louis Pratt's words, the avant-garde of capitalism.",
    "options": [ { "btn": "To Costumes/Colombie", "scene": "costumesColombie"} ]
  },
  "costumesColombie": {
    "meta": 21,
    "title": "Costumes/Colombie",
    "text": "Through Hamilton's Carguero, Roulin's model found its way into the volume on Colombia of the monumental 67-volume encyclopedic Collection: L'Univers Pittoresque. The cabinet traveller César Famin arranged on a generic natural background a set of figures that mixed the costumes of Colombia and Guyana. The Collection: L'Univers Pittoresque, in which Famin participated, and d'Orbigny's Voyage pittoresque, are examples of how, in France, the 'picturesque' was understood as a publishing guideline; a way of making books and periodicals, richly illustrated and with complex logistical processes.  The books and images of the travellers are used as privileged sources of information for these encyclopedic projects with pretensions of synthesis. An image of the Carguero is representative of this procedure. It does not pretend to be a faithful representation of nature, but rather constructs a generic exoticizing space that synthesizes Famin's entire journey through Guyana and Colombia. Different human types and their costumes are arranged in juxtaposition to establish comparisons and contrasts between them. In this way, the pretension of travel books to bring distant geography closer, so that it can be experienced without leaving home, is realized and replicated with cabinet travels.",
    "options": [
      { "btn": "Back to Roulin's hypothetical album", "scene": "roulinAlbum"},
      { "btn": "Continue route", "scene": "roulinPrensa" }
    ],
    "areas": [
      { "x": 222, "y": 176, "w": 126, "h": 345, "btn": "", "tooltip": "", "scene": "colgadaBlake" },
      { "x": 74, "y": 723, "w": 155, "h": 568, "btn": "", "tooltip": "", "scene": "sacerdote" },
      { "x": 239, "y": 712, "w": 205, "h": 306, "btn": "", "tooltip": "",  "scene": "agachado" },
      { "x": 333, "y": 652, "w": 212, "h": 448, "btn": "", "tooltip": "", "scene": "cargandoNino" },
      { "x": 583, "y": 386, "w": 362, "h": 603, "btn": "", "tooltip": "", "scene": "carguero" },
      { "x": 851, "y": 674, "w": 360, "h": 684, "btn": "", "tooltip": "", "scene": "plantadorSurinam" },
      { "x": 1065, "y": 549, "w": 216, "h": 566, "btn": "", "tooltip": "", "scene": "mujerSombrero" },
      { "x": 1238, "y": 633, "w": 448, "h": 708, "btn": "", "tooltip": "", "scene": "familia" },
      { "x": 1484, "y": 328, "w": 233,  "h": 522, "btn": "", "tooltip": "", "scene": "colgado" },
      { "x": 1498, "y": 697, "w": 201, "h": 609, "btn": "", "tooltip": "", "scene": "mujerConPajaro"}
    ]
  },
  "colgadaBlake": { "meta": 186 },
  "sacerdote": {
    "meta": 181, "areas": [ { "x": 112, "y": 383, "w": 150, "h": 440, "btn": "", "tooltip": "", "scene": "roulinMayor" } ]    
  },
  "agachado": {
    "meta": 180,
    "areas": [
      { "x": 109, "y": 294, "w": 195, "h": 376, "btn": "", "tooltip": "", "scene": "roulinPlaza" },
      { "x": 245, "y": 382, "w": 136, "h": 229, "btn": "", "tooltip": "", "scene": "roulinPlaza" }
    ]
  },
  "cargandoNino": { "meta": 178 },
  "carguero": {
    "meta": 14, "areas": [ { "x": 549, "y": 876, "w": 276, "h": 426, "btn": "", "tooltip": "", "scene": "cargueroRoulin" } ]
  },
  "cargueroRoulin": { "meta": 11 }, "plantadorSurinam": { "meta": 187 },
  "mujerSombrero": {
    "meta": 179, "areas": [ { "x": 315, "y": 441, "w": 150, "h": 447, "btn": "", "tooltip": "", "scene": "roulinMayor" } ]
  },
  "roulinPrensa": {
    "viz": {"filter": [ ["modelo", "=", "roulin"], ["soporte", "=", "prensa"] ], "type": "pack", "x": "modelo", "y": "soporte"},
    "title": "The Carguero in the European illustrated press",
    "text": "By removing the figure from the background, A. de Lattre used the Carguero to contrast the practice of the Quindío road with the estiveros of Putumayo. From this source, the image was put on an engraving plate, and was used in mass-printing projects in Europe by various illustrated press companies in countries such as France (Magasin Pittoresque, 1848), Spain (Semanario Pintoresco Español, 1849) and Germany (Das Pfennig-Magazin, 1851). These magazines were local versions of The Penny Magazine, first published in the United Kingdom in 1832 by the Society for the dissemination of useful knowledge. The model of this weekly magazine soon spread to various parts of Europe, disseminating not only the format of a publication, but technological applications of woodcutting and prototyping, a process of rationalization of print production, a business model and an ideal of the correlation between the expansion of the readership market and the possibility of bringing access to 'useful' knowledge to the working classes. Magasin Pittoresque, for example, was first published by Édouard Charton in 1833 and is associated with a faction of saintsimonism called 'republican saintsimonism'. Charton expressly referred to his publishing projects as means by which he intended to 'combat the ignorance of the popular classes' (Le Magasin Pittoresque, 1833, p. 98). Dissemination was made possible by the recent invention of metal plate engraving processes useful to obtain copies in 'hundreds of thousands' (Le Magasin Pittoresque, 1833, p. 98). In this context, images reached a wider public and offered a quicker and more fun way of learning from which children would benefit: 'instead of letting them sleep or yawn over a book, take them often to museums, or even to boulevards, georamas and panoramas' (Le Magasin Pittoresque, 1833, p. 99). Likewise, in the Semanario Pintoresco Español, images are mentioned for their function of 'representing absent things as if they were before us and which we could only see at the cost of arduous journeys and great expense’ (Semanario Pintoresco Español, 1844, p. 48).",
    "options": [ { "btn": "Start over", "scene": "start"} ]
  },
  "familia": { "meta": 183 }, "mujerConPajaro": { "meta": 184 }, "colgado": { "meta": 185 }
}
```

<!-- #region tags=["hermeneutics"] -->
One additional, important aspect of this method for creating interactive panels is its potential expandability: besides the automated method of filtering for creating subsets and the definition of standard visualisations, the Aventura.js scene system works in a way that facilitates the creation of additional personalised panels (following the initial intuitive dispositions that gave origin to this project) and the addition of hyperlinks that connect to additional information. In our case, we added an automatized set of scenes that contain information about each element in the dataset and links to the original repositories in which they are hosted. This strategy expands the readings of the archive in the sense that it can work both inside the panel, offering a particular configuration and interpretation, and outside the panel, in a world of dispersed collections that have their own good neighbours and potentially new associations.
<!-- #endregion -->

<!-- #region tags=["hermeneutics"] -->
Following all the steps explained before, we designed a JavaScript object that describes a set of scenes for our interactive panels. This scenes object is then processed by our custom functions to “hydrate” it, that is, to add the additional information that Aventura.js requires for  rendering the panels: filtering the dataset, constructing the visualisations, creating individual scenes that display links and metadata of each element in the collection.
<!-- #endregion -->

```python jdh={"module": "object", "object": {"source": ["Interactive panels"]}} tags=["figure-observable-*", "h-1600px"]
from IPython.display import IFrame
IFrame('https://observablehq.com/embed/@aventura-interactiva-ws/interactive_carguero_atlas?cells=panelContainer%2CpanelFromScenes%2Cscenes',width='100%', height='800')
```

## A guided tour of the Carguero Atlas: the path of Humboldt and Roulin


The collection of the *Carguero* was created by one of the authors of this article, who built it largely by following a logic of elective affinities, initially driven by a primary interest in representations of figure and spatial dimension in the 19th-century. The collection specified and grew as the topic evolved into his doctoral research. Simultaneously, the development of the digital tool presented here served as a heuristic method for exploring the material. In this way, the Pathosformel, understood as an interpretative paradigm, enabled the establishment of relationships of resemblance concerning a figure that adopts a specific morphology charged with pathos. Its formulaic nature allows it to move fluidly across different contexts of circulation. In the spirit of the concept of good neighbourliness, it allowed for the exploration of meaningful connections between the elements of the collection, extending it to include elective affinities with other images that do not necessarily refer to the Carguero.  At the same time, it facilitated the expansion of categories through which the elements were incorporated into a database. This database grew to become a collection that, in general terms, is divided into two large groups of images: 19th-century images, which have been collected comprehensively, and reinterpretations created post-19th century (namely, remixes, artworks, memes, and other intertextual works). For this second group, the images collected are representative of possible use cases but are by no means exhaustive of the multiplicity of works circulating in popular culture.


In this section, we offer further description of both the design and our understanding of one of the narrative paths of the Carguero Atlas. This narrative is the result of intensive use of the tool, experimenting with the design of different panels, using the types of visualisations mentioned above, searching for various ways to organise and engage with the material through comparison, juxtaposition, and contrast. In this specific case we develop a guided tour that juxtaposes two competing models of the Carguero: Humboldt’s Enlightenment-era Vues des Cordillères (1810), which embeds the figure within a vertical Andean ecology, and Roulin’s 1824 watercolour, which isolates the Carguero as a racialized ‘type.’ This contrast mirrors Warburg’s dialectic of Pathosformeln, where motifs oscillate between integration (Humboldt’s ecological balance) and intensity (Roulin’s bodily focus). Aventura.js visualizes this tension through scatterplots, where post-1819 images cluster around Roulin’s model, reflecting the 19th-century’s shift from natural history to comparative anatomy —a disciplinary realignment that reduced the Carguero to a racialized labourer. We, however, invite the reader to navigate other possible paths in the atlas by interacting with the interface.

```python tags=["figure-interface1-*"]
# Initial visualisation interface of the panel: a comparison between Humboldt's and Roulin's Carguero models
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Initial visualisation interface of the panel: a comparison between Humboldt's and Roulin's Carguero models"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface1.png"), metadata=metadata)
```

For this one particular tour, we filtered images created before the 20th century (in the filter system described as \[“date”, "<", 1900\]), particularly focusing on the tagged categories “figure/background” (in Spanish, “figura/fondo”), “source model” (“modelo”), “date” (“fecha”) and “period” (“periodo”). The "Figure/background" metadata was tagged based on the proportion of figures and landscapes: the images that predominantly represent landscapes without human figures are labelled as "background" (“fondo”), the images that predominantly represent landscapes that contain humans are labelled as "balance" (“equilibrio”), and the images in which there is a predominance of human figures are labelled as "figure" (“figura”).


The “source model” category groups images according to the model they are based on: we identified a set of iconographic models that were extensively used and reappropriated in subsequent images. The most important models are the ones labelled “humboldt” and “roulin” in our dataset. The first one comes from the famous Prussian naturalist Alexander von Humboldt, who, in his diary, and later in his work Vues des Cordillères (<cite data-cite="7299034/49SACHS5"></cite>), recorded his encounter with a Carguero named Villanero. Thanks to Humboldt’s prestige as a traveller, and the profuse circulation of his travel stories —mostly apocryphal editions of unscrupulous publishers who took advantage of his fame— his description of the encounter became famous and a point of reference for a large number of travellers when describing their own experiences. Second, there is the “source model” of François Desiré Roulin, a scientific traveller who made part of an expedition composed of French professionals recommended by Georges Cuvier and Alexander von Humboldt to the plenipotentiary minister of Gran Colombia —the name at the time of the state roughly equivalent to the current Republic of Colombia—, Francisco Antonio Zea.


For one of the scenes (Scene name: scatterPeriodoFigura), using Aventura.js’s new custom functions, we made a scatterplot (keyword “scatter”) representing the attribute "period" on the X axis and the attribute "figure/background" on the Y axis. We can observe in the resulting panel that there are more images labelled as "background" or as "balance" in the period between 1770 and 1810 than in the other periods. Specimens from the late colonial period (1770-1810) accounted for a transformation in visual epistemology characterised by presenting different human types, understood as castes or nations, as characters in their immediate geographical contexts, including the animal and botanical varieties peculiar to them (<cite data-cite="7299034/8JZZYA7Z"></cite>). Variations of the trope of placing human specimens in their geographical and natural contexts can be seen, for instance, in Vicente Albán's mestizaje paintings, and in Cuadro del Peru commissioned by Ignacio Lecuanda (<cite data-cite="7299034/8JZZYA7Z"></cite>).

```python tags=["figure-interface2-*"]
# Figure/Background vs. Period
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Figure/Background vs. Period"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface2.png"), metadata=metadata)
```

This transformation is, paradigmatically, also present in Humboldt's views of nature. Plate V of Vues des Cordillères (<cite data-cite="7299034/49SACHS5"></cite>) is Humboldt’s representation of the Carguero, and exists within this visual episteme; furthermore, the plate’s production and meaning are affected by the American continent social networks in which Humboldt's journey, journal entries, and sketches were produced (<cite data-cite="7299034/KWRLHZYH"></cite>) and by the European social networks that supported the conversion of sketches and notes into images and texts, putting them into a global comparative horizon (<cite data-cite="7299034/4TSNQZT6"></cite>). In the image representation there is a balance between the natural elements and activities of the Carguero: both are elements that structure the composition and provide relevant information to understand the use of plants, means of transport, and other particularities of Andean verticality. This explains why we can see in the panel that during this period the attribute "balance" is predominant.


In contrast, from 1819-1850, images increasingly emphasised figures over backgrounds, particularly using Roulin’s model.This can be seen in a panel that shows a scatter plot contrasting “period” on the Y axis with “source model” on the X axis (Scene name: "scatterRoulin").

```python tags=["figure-interface3-*"]
# Source model vs. Period
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Source model vs. Period"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface3.png"), metadata=metadata)
```

This can also be seen in another panel that depicts a circle pack tree map (Scene name: "packRoulin") filtered to include only the period "1819-1850,” and displaying the hierarchical organisation of the attributes "source model" and "background and figure”. It is striking that this is the most used model, since all travellers quote Humboldt as a reference for the description of the Carguero, but they do not use his image as a model. As the initial compare graph (Scene name: 'start') of two adjacent images included in our atlas shows, there are clear differences in style in both models. It is especially important to note that Humboldt's image integrates the Carguero as a part of the landscape, whereas Roulin’s highlights its saliency and physical characteristics.

```python tags=["figure-interface4-*"]
# Source model in the 1819 - 1850 period
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Source model in the 1819 - 1850 period"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface4.png"), metadata=metadata)
```

On another circle pack tree map (Scene name: "packHumboldtPeriodo") with the “source model” attribute filtered by "humboldt,” and displaying the hierarchical organisation of the attributes "period" and "figure/background", it can be observed that, in the "1819-1850" period, the images which used Humboldt’s image as a model turned the “landscape” into “figures,” and others took the “figures” out and turned the images into “background.”

```python tags=["figure-interface5-*"]
# Humboldt's Figure/Background and Periods
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Humboldt's Figure/Background and Periods"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface5.png"), metadata=metadata)
```

For another panel (Scene name: "roulinModel"), we used a circle pack tree map with a filter to get only Roulin’s derivations. In this panel we can see the great diversity of contexts in which this model transformed its meaning, adapted by communities of interpretation that demanded new epistemic and aesthetic criteria of validity. In this way, Roulin (1824) and later Alcide d'Orbigny (1841) use the category of "type" produced within the circle of the Académie des sciences in Paris, to create their image of the Carguero. This model was reinterpreted in different contexts. Colonel John Potter Hamilton (1827) linked it to British "picturesque" explorations for political and commercial purposes, while Cesar Famin's entry on Colombia in L'Universe Pittoresque associated it with the genre of costumes. Additionally, the image was featured in various European popular illustrated press magazines, including the Magasin Pittoresque (1848), the Semanario Pintoresco Español (1849), and Das Pfennig-Magazin (1851). Despite all these sources citing Humboldt's encounter with the Carguero, they favoured Roulin's drawing as a suitable model for the growing interest in exploring American human types.

```python tags=["figure-interface6-*"]
# Material substrates of Roulin's derivations
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Material substrates of Roulin's derivations"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface6.png"), metadata=metadata)
```

These data assisted readings of our collection by using interactive panels take us to the following question: why the travellers who were in Colombia/Nueva Granada in the period “1819-1851” did not use Humboldt’s Carguero model? What aesthetic, technical, and epistemic conditions made it possible for Roulin's model to circulate and to be re-signified in the different interpretation communities in which it was adapted? By reviewing the primary sources and secondary literature, we conclude that two factors must be considered to answer these questions. The first reason is technological, related to the techniques of inscription and practices of image circulation. The second is epistemological and rhetorical, related to the audiences that the inscriptions intended to affect. Bruno Latour understands these two aspects as part of the same process: the interest in inscriptions is understandable insofar as it is related to the trajectories, routes, and expansive plans that their technology and structure make possible. Correlatively, displacement allows for innovations in inscriptions, writing, archiving, and processing, which only make sense to the extent that they persuade and gain adherence in the midst of controversies (<cite data-cite="7299034/CT29YC4T"></cite>).


The drawings and images made by Roulin participated in an image circulation network related to 19th century visual culture, such as the rationalisation of production, division of labour, and mass production for a market of travellers who were interested in these products. In the contemporary period, collections of images of travellers who were in South America at the beginning of the 19th century have become known thanks to donations from private collectors. This is the case of the Alphonse Giast collection in Argentina and Chile (<cite data-cite="7299034/P9BQM6PD"></cite>; <cite data-cite="7299034/NINP9SWY"></cite>), Joseph Brown collection, Le Moyne collection, and Roulin collection in Colombia (<cite data-cite="7299034/TJVGPCC8"></cite>; <cite data-cite="7299034/Y6X6CWGR"></cite>; <cite data-cite="7299034/YJIU4CYH"></cite>). Throughout the twentieth century, and even today, these images have been predominantly seen as visual testimonies of the early republic and, as such, have been integrated into narratives of nation building. Recently, researchers have compared the collections, including the corpus of images attributed to Roulin, and have found a series of iconographic coincidences that indicate the existence of practices of adapting models to different contexts by means of details, such as the background, tools, clothing, costumes, and other elements that vary between compositions (<cite data-cite="7299034/RTPHGI8V"></cite>). These practices have been analysed by researchers by using concepts such as "multiple authorship" and "multiple originals", allowing them to be placed on the horizon of other image-making practices that took place throughout South America in the postcolonial Hispanic space.


Thus, Roulin's prominence in the visual culture of the early Republican period has been highlighted by other scholarship (<cite data-cite="7299034/MZ9FSNZV"></cite>). For example, Auguste Le Moyne copied the profile of Simón Bolívar drawn by Roulin in 1828 (<cite data-cite="7299034/ZF79WP3U"></cite>). Likewise, his watercolours were copied and published in the travelogues of Gaspar Mollien (1824), John Potter Hamilton (1827), Guilaume Lallement (1826), Alcide D'Orbigny (1841) and M. A. de Latrre (1848). Modifications of his motifs can also be found in engravings by John Potter Hamilton (1827, 1993), Gaetano Osculati (1954), and Cesar Famin (1837). Thus, it has been speculated that Roulin may have had a catalogue of plates at the service of travellers with scenes of customs, types, views, and monuments (<cite data-cite="7299034/MZ9FSNZV"></cite>; <cite data-cite="7299034/RTPHGI8V"></cite>).


In relation to the aesthetic and scientific conditions of acceptability, Roulin's conceptual and visual universe is directly related to his scientific training as a physiologist practicing comparative anatomy in the scientific circle of the Académie des sciences in Paris. Roulin travelled to Colombia as a member of a scientific expedition that the plenipotentiary minister Francisco Antonio Zea had arranged for personalities such as Georges Cuvier and Alexander von Humboldt (<cite data-cite="7299034/HBG4E7CR"></cite>; <cite data-cite="7299034/84ASJI2S"></cite>). Likewise, he published some of the results of his research in the Annales des sciences naturelles (<cite data-cite="7299034/QU7TF99V"></cite>; <cite data-cite="7299034/8BS2RPC8"></cite>) and was involved in the posthumous edition of Le Règne Animal created by Cuvier's disciples in 1836 (<cite data-cite="7299034/VAD5AUXZ"></cite>). Roulin's watercolours and drawings, some of them made with the help of a camera lucida (Roulin in <cite data-cite="7299034/QU7TF99V"></cite>, p. 29), show his interest in highlighting aspects related to the animal and human classification that had been postulated in this scientific circle, which, from a visual point of view, sought to establish relationships between external characters, with the systematic functioning of internal organs (<cite data-cite="7299034/SU34NHK8"></cite>, p. 247; Senior, 2018). In the specific classification of the human race as a bipedal mammal, Cuvier considered that its development was determined by external aspects, such as climate or geography, and internal aspects, such as the intellectual characteristics of the races (<cite data-cite="7299034/VAD5AUXZ"></cite>, pp. 97-98). These were organised in a hierarchy that descended from the Caucasian race to the Ethiopian, which was represented as the least developed. The position of Americans in this classification was uncertain, since it was not possible to resolve the multiplicity of characteristics observed in the same category (<cite data-cite="7299034/VAD5AUXZ"></cite>, pp. 103-104). In fact, Roulin drew from Cuvier’s disciples edition of Le Règne Animal some of the plates of American types that illustrate their difficult classification, and is cited as one of the travellers who provided information on the subject (<cite data-cite="7299034/VAD5AUXZ"></cite>, pl XIV).

```python tags=["figure-interface7-*"]
# Comparision between Roulin's Animal Kingdom plate and a watercolour plate
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Comparision between Roulin's Animal Kingdom plate and a watercolour plate"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface7.png"), metadata=metadata)
```

Consequently, it is understandable that Roulin’s sketch of the Carguero was modified and turned into an engraving in Alcide d'Orbigny's travelogue, Voyage Pittoresque dans les deux Amériques (<cite data-cite="7299034/IC53A5GV"></cite>), a popular book that contributed significantly to the dissemination of knowledge of Colombia in Europe. D'Orbigny, a mollusc specialist, belonged to the same scientific circle as Cuvier and Roulin. Like the latter, he was credited as a "disciple" in the 1836 edition of Le Règne Animal. In fact, his figure plays a fundamental role in research on the determination of the racial characteristics of Americans for Cuvier's classification of Le Règne Animal. In 1825, he was commissioned by the Museum of Natural History in Paris to investigate "in depth the language and physiological characteristics" of South American peoples (<cite data-cite="7299034/XQRMQ6JZ"></cite>, p. IX). As an analytical tool, Roulin and d'Ornigny helped transpose, from the comparative anatomy of animals, the category of "type" to find a way to organise the multiplicity of human populations existing in America. In this sense, Roulin's and d'Orbigny's Carguero drawings can be interpreted as an investigation into a "social type" that existed because of specific climatic, geographical, and racial features. These are rationalised by the observations of the external characters of people and their relations with internal organic functioning. Roulin refers to the Carguero as a "human mount" (<cite data-cite="7299034/JVP6N5AR"></cite>, p. 263), pointing at a comparison of different modes of transportation and uses of human and animal muscle-driven motion power.

```python tags=["figure-interface8-*"]
# Roulin, d'Orbigny and the category of 'type'.
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Roulin, d'Orbigny and the category of 'type'"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface8.png"), metadata=metadata)
```

Another derivation of Roulin's model of the Carguero is found in the travelogue of the British Diplomat Colonel John Potter Hamilton (<cite data-cite="7299034/ZJA9TWSP"></cite>), the first official envoy on behalf of the British government to Colombia. After returning to his homeland, he published his travelogue with the famous publishing house John Murray. This publishing house was noted, among other things, for tapping into the demand for such products, and published more than 200 travel books during the first half of the 19th century (<cite data-cite="7299034/YJEB294J"></cite>, p. 1334). Hamilton used, with adaptations, several of Roulin's models in his book. However, the new disposition of the image of the Carguero changes the direction of the characters and places them on a laborious ascent. They climb around a tree on the curve of a steep mountain road (see graphical comparison on scene called "roulinHamilton"). The image is similar to other images of the period, such as those in the travelogues of British merchant traveller Charles Stuart Cochrane (<cite data-cite="7299034/E4J6TU6R"></cite>) and Swedish diplomatic traveller August Gosselman (<cite data-cite="7299034/HQUVJJ2V"></cite>; <cite data-cite="7299034/7F7VVS9Z"></cite>). These images are characterized by the use of a picturesque aesthetic that functions as a device to frame the landscape and organize it with industrious human figures, settlements, crops, and productive animals, in contrast to the untamed wilderness that still needs to be controlled by man. In these stories, the images coexist with visual metaphors that frame the observations of nature as "pictures", "paintings", "drawings", "sketches", "maps", "scenery", "beautiful shows", "dioramas", "panoramas", "magic lanterns" or "Peep Shows". The use of the Carguero image is then indicative of the resignification of picturesque aesthetics in the voyages to America, characterised by the use of ethnographic and social themes of concern to travellers of the period (<cite data-cite="7299034/WFVWC9QP"></cite>), who were described by Mary Louis Pratt as the avant-garde of capitalism (<cite data-cite="7299034/QCYRHZVF"></cite>).

```python tags=["figure-interface9-*"]
# Hamilton's Picturesque Carguero
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Hamilton's Picturesque Carguero"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface9.png"), metadata=metadata)
```

Likewise, through Hamilton, Roulin's model found its way into the volume on Colombia of the monumental 67-volume encyclopaedic Universal Picturesque Collection, in which the cabinet traveller César Famin arranged, on a generic natural background, a set of figures intended to imagine the costumes of Colombia and Guyana. The "Universal picturesque collection" (Collection: L'Univers Pittoresque) in which Famin participated, and d'Orbigny's "picturesque journey" (Voyage pittoresque), are examples of how in France "the picturesque" was understood as a publishing guideline; a way of making books and periodicals, richly illustrated and with complex logistical processes (<cite data-cite="7299034/SPLKI368"></cite>). The books and images of the travellers present are used as privileged sources for these encyclopaedic projects with pretensions of synthesis to take place. The image of the Carguero is representative of this procedure. It does not pretend to be a faithful representation of nature, but rather constructs a generic wild space that synthesizes his entire journey through Guyana and Colombia, on which different human types and their costumes are arranged to juxtapose them and establish comparisons and contrasts. In this way, the pretension of travel books to bring distant geography closer so that it can be experienced without leaving home is realised with cabinet travels and, at the same time, replicated.

```python tags=["figure-interface10-*"]
# Costumes / Colombie Carguero
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Costumes / Colombie Carguero"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface10.png"), metadata=metadata)
```

Finally, by focusing on his figure instead of the background, the Carguero drawing let A. de Lattre to contrast the practice of the Quindío road with the *estiveros* of Putumayo. This made it possible for the image to be used in mass-production projects in Europe and for it to be circulated, held on an engraving plate, by various illustrated press companies in countries such as France (Magasin Pittoresque, 1848), Spain (Semanario Pintoresco Español, 1849) and Germany (Das Pfennig-Magazin, 1851). These magazines were local versions of The Penny Magazine, first published in the United Kingdom in 1832 by the Society for the dissemination of useful knowledge. The model of this weekly magazine soon spread to various parts of Europe, disseminating not only the format of a publication, but technological applications of woodcutting and prototyping, a process of rationalisation of print production, a business model and an ideal of the correlation between the expansion of the readership market and the possibility of bringing access to "useful" knowledge to the working classes. Magasin Pittoresque, for example, was first published by Édouard Charton in 1833 and is associated with a faction of saintsimonism called "republican saintsimonism" (<cite data-cite="7299034/PQI8HPJH"></cite>). Charton explicitly referred to his publishing projects as means by which he intended to "combat the ignorance of the popular classes" (Le Magasin Pittoresque, 1833, p. 98). Dissemination was made possible by the recent invention of metal plate engraving processes that made it possible to obtain copies in "hundreds of thousands" (Le Magasin Pittoresque, 1833, p. 98). In this context, images make it possible to reach a wider public, to leave a lasting impression, and a quicker and more fun way of learning from which children benefit: "instead of letting them sleep or yawn over a book, take them often to museums, or even to boulevards, georamas and panoramas" (Le Magasin Pittoresque, 1833, p. 99). Likewise, in the Semanario Pintoresco Español, images are mentioned for their function of "representing absent things as if they were before us and which we could only see at the cost of arduous journeys and great expense’ (Semanario Pintoresco Español, 1844, p. 48).

```python tags=["figure-interface11-*"]
# Costumes / Colombie Carguero
metadata = {
    "jdh": {
        "module": "object",
        "object": {
            "source": [
                "Costumes / Colombie Carguero"
            ],
            "type":
            "image"
        }
    }
}
display(Image("./media/interface11.png"), metadata=metadata)
```

## Discussion


### The Carguero models


This study has shown how web technologies and visualisation tools can be of great help in organising research data and producing interactive interfaces for developing historical narratives and arguments. By classifying visual material in terms of specific formal details, themes, or symbolic characters, researchers can follow historical and geographical trajectories in multiple sources, periods, and places. Moreover, this heterogeneity can be advantageous for observing the relationships between different epistemic registers, publishing companies, image-making practices, uses, and functions, among other categories. The use of similar models in this heterogeneity makes it possible to identify common patterns that would otherwise go unnoticed. Although this approach may present some risks, such as anachrony or dispersion of the research object, it can provide a different perspective of images and their role in the history of visual and print culture. This is because it focuses not on authors or genres, but on the trajectory of the symbolic characters that circulate between different contexts of interpretation. In this study, we delineated a possible trajectory by considering the possible relationships suggested by some of the categories in our dataset.


For instance, one question we explored in our dataset was why the travellers in 19th century Colombia, who always used Alexander von Humboldt as a reference to narrate their experience of the encounter with the Carguero, did not use Humboldt’s image of the Carguero as a model for their illustrated travelling diaries, but instead used that of Francois Desiré Roulin. This occurs for two reasons. First, a rhetorical reason: Roulin’s Carguero was the pathos that made the image more suitable for the expectations of the period's audiences, who were interested in the human figure engaged in actions within the landscape, allowing them to explore the morphology of social types. In this sense, it was observed that images circulated for rhetorical needs in contexts in which historical actors faced different types of controversies, such as the racial classification of populations, the economic and political utility of certain territories, and the need to extend the universe of readers in the midst of popular projects for the circulation of knowledge. In all of these contexts, images played an important epistemological role. Second, there is the problem of the possibilities afforded by technology and the processes of rationalising the mass production of images for a market that demands such products. This relates to the technologies of serial reproduction of handmade images, the use of copies and models for technical reproducibility, and their printing in books and periodicals. In this study, it was shown that Roulin’s model was at the centre of an intense international image circulation network, whose trajectories and drifts took us to mid-nineteenth-century Europe, through travel book printing companies in Britain and encyclopaedias and picturesque periodicals with practices of rationalisation of production in France. In this case, there is an expression of the dialectic between distance and immediacy (Denkraum). Through a dynamic interplay between direct observation of the object and the distance that necessitates its elaboration through the mediation of image inscription technology, travellers, both in person and in the study, allowed others, through images, to travel and access knowledge of the world from a distance."


We intended to track the Carguero theme through time and space in a manner similar to what Warburg intended to do with Renaissance interpretation of the pathetic motifs of expression (Pathosformel) of antiquity. While the themes of classical beauty and pathetic gestures of the ancient world seem foreign to our corpus, we must remember that Warburg himself was a European traveller in America. In 1895, he visited the “Indios Pueblo” in New Mexico, USA. Warburg was confronted with problems similar to those of our travellers, although his disciplinary and technological tools were different. This trip was recorded using photographs (<cite data-cite="7299034/LD7MWDL4"></cite>) and presented in a famous lecture at the end of his internment in a psychiatric clinic in Kreuzlingen in 1923 (<cite data-cite="7299034/8AVE49LH"></cite>). In this experience, under the context of the emergence of social sciences, Warburg sought to establish contact between art history and anthropology. He wanted to question how symbols mediate reality and enable the construction of distance for reflection (Denkraum). Warburg considered this a tragic process that is never fully achieved. So it was with his journey, for in trying to find common ground between antiquity and "primitive man" he could not avoid projecting his Eurocentric prejudices and ignoring the complexity of the processes he witnessed (<cite data-cite="7299034/H2LJLXTS"></cite>). The travellers who encountered the Carguero also tried to use images as a mediation with unknown nature and characters to rationalise and better understand them. As in Warburg's case, these attempts to establish distance were tragic, insofar as the distance they created often did not allow them to recognize those who were judged as savages, and unfit to be part of Civilization.


### The interactive panels


For Antón-Barco, “Mnemosyne created a new kind of knowledge (visual) that intends to gather, through images, the dispersion –but also the secret coherence– of our entire world. It combines the aesthetic paradigm of the visual-form with an epistemic paradigm of knowledge." (<cite data-cite="7299034/JS2I4PY3"></cite>, p. 53). We intended to show how such a historical strategy for studying visual sources and visual culture could be expanded by means of digital tools. This involved creating a hermeneutic collection from the consultation of physical and digital archives and the recompilation of fortuitous connections derived from the principle of good neighbourliness. Then, we adopted the computational process of filtering as an interpretative strategy and created a version of Warburg’s montage and homogenization strategies by using adapted conventions from the field of data visualisation, and finally we constructed an interactive tour based on a semi-linear structure that connected the panels through different hypertextual paths. These strategies helped us to both create a rich presentation and interpretation of the historical sources and to discover new relationships and readings of the data. The iterative workflow of Aventura.js —filtering data, rendering panels, and revising metadata—echoes Warburg’s own endless reordering of the Mnemosyne Atlas.


A challenge derived from this approach is the defence of subjective selection and interpretation in the context of scholar research in the humanities that use computational tools. The use of computation sometimes hides the multiple decisions made in a research project under the guise of supposed mechanical objectivity of computers. We, following authors like Drucker (<cite data-cite="7299034/ZAMMD7FP"></cite>), wanted to make explicit such a hermeneutic process and to defend its value. Collecting is an activity that helps to enrich historical readings of documents, in our case, visual pieces. Further research should also work towards a reconciliation between mechanical feature-based problems and the introduction of analytic categories like good neighbourliness. At the end, the goal of projects of this nature should be to find fruitful intertwining between user independent mechanistic approaches and interpretative approaches (<cite data-cite="7299034/ZAMMD7FP"></cite>).


In this line, one possible enhancement of our method would be to include graphs, adjacency matrices, and other networks representations. One potential advantage of our scene-based method is that the Atlas can be, virtually, expanded indefinitely. New scenes can be added due to its modular nature and can be integrated into the current interpretation and discoveries. Another particular addition would be to track the navigation of users in order to reflect on practices of navigating and adapting an archive. The principle of good neighbourliness can be further expanded to connect to different repositories and archives or to allow user feedback and collaborative collections. Evaluation and assessments by users could also, in the future, provide insights into how different audiences interpret and interact with the archive, offering valuable perspectives to refine its usability, accessibility, and epistemic affordances.

<!-- #region editable=true slideshow={"slide_type": ""} tags=["hidden"] -->
## Bibliography

<!-- #region editable=true slideshow={"slide_type": ""} tags=["hidden"] -->
<div class="cite2c-biblio"></div>
<!-- #endregion -->
