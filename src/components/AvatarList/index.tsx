import React, { FC, memo } from 'react';
import { ScrollView } from 'react-native';
import StoryAvatar from '../Avatar';
import { StoryAvatarListProps } from '~/core/dto/componentsDTO';
import { InstagramStoryProps } from '~/core/dto/instagramStoriesDTO';

let FlashList: any;

try {

  // eslint-disable-next-line global-require
  FlashList = require( '@shopify/flash-list' ).FlashList;

} catch ( error ) {

  FlashList = null;

}

const StoryAvatarList: FC<StoryAvatarListProps> = ( {
  stories, loadingStory, seenStories, colors, seenColors, size,
  showName, nameTextStyle, nameTextProps, listContainerProps, listContainerStyle,
  avatarListContainerProps, avatarListContainerStyle, onPress,
} ) => {

  const renderItem = ( story: InstagramStoryProps ) => story.renderAvatar?.()
    ?? ( ( story.avatarSource || story.imgUrl ) && (
      <StoryAvatar
        {...story}
        loadingStory={loadingStory}
        seenStories={seenStories}
        onPress={() => onPress( story.id )}
        colors={colors}
        seenColors={seenColors}
        size={size}
        showName={showName}
        nameTextStyle={nameTextStyle}
        nameTextProps={nameTextProps}
        key={`avatar${story.id}`}
      />
    ) );

  if ( FlashList ) {

    return (
      <FlashList
        horizontal
        {...listContainerProps}
        {...avatarListContainerProps}
        data={stories}
        renderItem={( { item } : { item: InstagramStoryProps } ) => renderItem( item )}
        keyExtractor={( item: InstagramStoryProps ) => item.id}
        contentContainerStyle={[ listContainerStyle, avatarListContainerStyle ]}
        testID="storiesList"
      />
    );

  }

  return (
    <ScrollView horizontal {...listContainerProps} {...avatarListContainerProps} contentContainerStyle={[ listContainerStyle, avatarListContainerStyle ]} testID="storiesList">
      {stories.map( renderItem )}
    </ScrollView>
  );

};

export default memo( StoryAvatarList );